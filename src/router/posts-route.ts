import {Request, Response, Router} from "express"

import {inputValidationMiddleware, inputValidationPost} from "../middlewares/input-validation-middleware";
import {
    contentValidation,
    shortDescriptionValidation,
    titleValidationCreate
} from "../middlewares/title-validation";
import {PostType} from "../repositories/types";
import {authRouter} from "./auth-router";
import {postsService} from "../domain/posts-service";
import {bloggersService} from "../domain/bloggers-service";
import {bloggersRoute} from "./bloggers-route";


export const postsRoute = Router({})


postsRoute.get('/', async (req: Request, res: Response) => {

    const PageNumber = req.query.PageNumber ? +req.query.PageNumber : 1
    const PageSize = req.query.PageSize ? +req.query.PageSize : 10

    const foundPost = await postsService.getPostsArray(PageNumber, PageSize);
    res.send(foundPost)

})

//не трогать!!!
postsRoute.post('/',
    authRouter,
    titleValidationCreate,
    shortDescriptionValidation,
    contentValidation, inputValidationPost, async (req: Request, res: Response) => {
        let newPost = await postsService.createPost(req.body.title,
            req.body.shortDescription, req.body.content, req.body.bloggerId)
        if (!newPost) {
            res.status(400)
        }
        res.status(201).send(newPost)
    })
// ************************************************************

postsRoute.get('/:id', async (req: Request, res: Response) => {
    const post = await postsService.findPostById(+req.params.id)
    if (post) {
        res.status(200).send(post)
    }

})


postsRoute.put('/:id', authRouter,
    titleValidationCreate,
    shortDescriptionValidation,
    contentValidation,
    inputValidationPost, async (req: Request, res: Response) => {

        let blogger = await bloggersService.getBloggerById(req.body.bloggerId)
        if (!blogger) {
            return res.status(400).send({errorsMessages: [{message: 'Invalid bloggerId', field: "bloggerId"}]})
        } else {
            const isUpdate = await postsService.updatePost(+req.params.id,
                req.body.title,
                req.body.shortDescription,
                req.body.content,
                req.body.bloggerId)
            if (isUpdate) {
                const post = await postsService.findPostById(+req.params.id)
                res.status(204).send({post})
            } else {
                res.send(404)

            }
        }

    })
postsRoute.delete('/:id', authRouter, async (req: Request, res: Response) => {
    const isDeleted = await postsService.deletePost(+req.params.id)
    if (isDeleted) {
        res.send(204)
    } else {
        res.send(404)
    }
})