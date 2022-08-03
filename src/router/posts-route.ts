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
import {bloggersService} from "../domain/bloggers-service";


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
        let blogger = await bloggersService.getBloggerById(req.body.bloggerId)
        if (!blogger) {
            return res.status(400).send({ errorsMessages: [{ message: "String",
                    field: "youtubeUrl" }, { message: "String", field: "name" }] })
        }

        const newPost: PostType = {
            id: +(new Date()),
            title: req.body.title,
            shortDescription: req.body.shortDescription,
            content: req.body.content,
            bloggerId: blogger.id,
            bloggerName: blogger.name,
        }

        const createdPost = await postsService.createPost(newPost)

        if (createdPost) {
            res.status(201).send(createdPost)
        } else {
            res.status(500).send('Something went wrong!')
        }
    })

postsRoute.get('/:id', async (req: Request, res: Response) => {
    let post = await postsService.getPostById(+req.params.id)

    if (!post) {
        return res.sendStatus(404)
    }

    return res.status(200).send(post)
})

postsRoute.put('/:id',
    authRouter,
    titleValidationCreate,
    shortDescriptionValidation,
    contentValidation,
    inputValidationMiddleware,

    async (req: Request, res: Response) => {
        const post = await postsService.getPostById(+req.params.id)
        if (!post) {
            return res.sendStatus(404)
        }

        if (post.bloggerId !== req.body.bloggerId) {
            return res.status(400).send({errorsMessages:[{message:"youtubeUrl should be is valid",field:"youtubeUrl"}]})
        }

        const updatedPost: PostType = {
            id: post.id,
            title: req.body.title,
            shortDescription: req.body.shortDescription,
            content: req.body.content,
            bloggerId: post.bloggerId,
            bloggerName: post.bloggerName
        }

        const updatedResult = await postsService.updatePost(updatedPost)

        if(!updatedResult) return res.sendStatus(404)

        return res.send(updatedPost)
    })


postsRoute.delete('/:id',
    authRouter,
    async (req: Request, res: Response) => {
        const isDeleted = await postDbRepository.deletePost(+req.params.id)
        if (isDeleted) {
            res.send(204)
        }
    })

