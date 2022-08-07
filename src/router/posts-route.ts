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
import {bloggersDbRepository} from "../repositories/bloggers-db-repository";


export const postsRoute = Router({})


postsRoute.get('/', async (req: Request, res: Response) => {

    const PageNumber = req.query.PageNumber ? +req.query.PageNumber : 1
    const PageSize = req.query.PageSize ? +req.query.PageSize : 10

    const foundPost = await postsService.getPostsArray(PageNumber, PageSize)

    res.status(200).send(foundPost)
    return

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
            res.status(400).json
            return
        }
        res.status(201).send(newPost)
    })
// ************************************************************

postsRoute.get('/:postId', async (req: Request, res: Response) => {
    const post = await postsService.findPostById(+req.params.id)
    if (post) {
        res.status(200).send(post)
        return
    } else {
        res.sendStatus(404)
    }

})

postsRoute.put('/:id', authRouter,
    titleValidationCreate,
    shortDescriptionValidation,
    contentValidation,
    inputValidationPost, async (req: Request, res: Response) => {

        const blogger = await bloggersDbRepository.getBlogger(req.body.id)
        if (!blogger) {
            res.sendStatus(404)
        } else {

            const test = await postsService.updatePost(
                +req.params.id,
                req.body.title,
                req.body.shortDescription,
                req.body.content,
                req.body.bloggerId)
            if (test) {
                const bloggerPost = await postsService.findPost(+req.params.id)
                res.status(204).send(bloggerPost);
            }
            res.send(404)
        }
    })

postsRoute.delete('/:id', authRouter, async (req: Request, res: Response) => {
    const isDeleted = await postsService.deletePost(+req.params.id)
    if (isDeleted) {
        res.sendStatus(204)
        return
    }
})