import {Request, Response, Router} from "express"

import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {
    contentValidation,
    shortDescriptionValidation,
    titleValidationCreate
} from "../middlewares/title-validation";
import {PostType} from "../repositories/types";
import {authRouter} from "./auth-router";
import {postDbRepository} from "../repositories/post-db-repository";
import {postsService} from "../domain/posts-service";


export const postsRoute = Router({})

postsRoute.get('/', async (req: Request, res: Response) => {
    const PageNumber = req.query.PageNumber ? +req.query.PageNumber : 1
    const PageSize = req.query.PageSize ? +req.query.PageSize : 10

    const foundPost = await postsService.getPostArray(PageNumber, PageSize);
    res.send(foundPost)
})

postsRoute.post('/',
    authRouter,
    titleValidationCreate,
    shortDescriptionValidation,
    contentValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
        let post = await postsService.createdPost(req.body.title,
            req.body.shortDescription,
            req.body.content, req.body.bloggerId)
        if (!post) {
            return res.status(400).send({errorsMessages: [{message: 'Invalid bloggerId', field: "bloggerId"}]})
        } else {
            const newPost: PostType = {
                id: +(new Date()),
                title: req.body.title,
                shortDescription: req.body.shortDescription,
                content: req.body.content,
                bloggerId: req.body.bloggerId,
                bloggerName: req.body.bloggerName,
            }
            await postsService.createdPost(newPost)
            res.status(201).send(newPost)
        }
    })

postsRoute.get('/:id', async (req: Request, res: Response) => {
    let post = await postDbRepository.getPostByIdById(+req.params.id)
    if (!post) {
        res.send(404)
    } else {
        const newPost: PostType = {
            id: +(new Date()),
            title: req.body.title,
            shortDescription: req.body.shortDescription,
            content: req.body.content,
            bloggerId: req.body.bloggerId,
            bloggerName: req.body.name
        }
        await postsService.getPostById(newPost)
        res.status(201).send(newPost)
    }
})

postsRoute.put('/:id',
    authRouter,
    titleValidationCreate,
    shortDescriptionValidation,
    contentValidation,
    inputValidationMiddleware,

    async (req: Request, res: Response) => {
        const post = await postsService.getPostById(req.params.id)
        if (!post) {
            return res.send(204)
        } else {
            const updatedPost: PostType = {
                    id: +new Date(),
                    title: req.body.title,
                    shortDescription: req.body.shortDescription,
                    content: req.body.content,
                    bloggerId: req.body.bloggerId
            }
            await postsService.updatePost(updatedPost)
            res.send(updatedPost)
        }
    })


postsRoute.delete('/:id',
    authRouter,
    async (req: Request, res: Response) => {
        const isDeleted = await postDbRepository.deletePost(+req.params.id)
        if (isDeleted) {
            res.send(204)
        }
    })

