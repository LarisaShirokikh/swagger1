import {Request, Response, Router} from "express"

import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {
    contentValidation,
    shortDescriptionValidation,
    titleValidationCreate
} from "../middlewares/title-validation";
import {PostType} from "../repositories/types";
import {authRouter} from "./auth-router";
import {postsService} from "../domain/posts-service";
import {bloggersService} from "../domain/bloggers-service";


export const postsRoute = Router({})

postsRoute.get('/', async (req: Request, res: Response) => {

    const pageSize: number = Number(req.query.PageSize) || 10
    const pageNumber: number = Number(req.query.PageNumber) || 1


    const findPost = await postsService.findPost(pageSize, pageNumber)
    const getCount = await postsService.getCount()
    res.send({
        "pagesCount": Math.ceil(getCount / pageSize),
        "page": pageNumber,
        "pageSize": pageSize,
        "totalCount": getCount,
        "items": findPost
    })
})
postsRoute.post('/', authRouter,
    titleValidationCreate,
    shortDescriptionValidation,
    contentValidation, inputValidationMiddleware, async (req: Request, res: Response) => {

        let blogger = await bloggersService.getBloggerById(req.body.bloggerId)
        if (!blogger) {
            return res.status(400).send({errorsMessages: [{message: 'Invalid bloggerId', field: "bloggerId"}]})
        } else {
            const newPost = {
                id: req.body.id,
                title: req.body.title,
                shortDescription: req.body.shortDescription,
                content: req.body.content,
                bloggerId: req.body.bloggerId

            }

            res.status(201).send(newPost)
        }
    })
postsRoute.get('/:id', async (req: Request, res: Response) => {
    const post = await postsService.findPostById(+req.params.id)

    if (post) {
        res.send(post)
    } else {
        res.send(404)
    }
})
postsRoute.put('/:id', authRouter,
    titleValidationCreate,
    shortDescriptionValidation,
    contentValidation,
    inputValidationMiddleware, async (req: Request, res: Response) => {

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