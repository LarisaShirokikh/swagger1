import {Request, Response, Router} from "express"

import {body} from "express-validator";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {
    contentValidation,
    nameValidation,
    shortDescriptionValidation,
    titleValidation,
    urlValidation
} from "../middlewares/title-validation";
import {postRepository, PostType} from "../repositories/post-repository";
import {bloggersInMemoryRepository} from "../repositories/bloggers-in-memory-repository";
import {authRouter} from "./auth-router";


export const postsRoute = Router({})

postsRoute.get('/', (req: Request, res: Response) => {
    let post = postRepository.getPosts()
    res.send(post)
})

postsRoute.post('/',
    authRouter,
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
        let blogger = await bloggersInMemoryRepository.getBloggerById(req.body.bloggerId)
        if (!blogger) {
            return res.status(400).send({errorsMessages: [{message: 'Invalid bloggerId', field: "bloggerId"}]})
        } else {
            const newPost: PostType = {
                id: +(new Date()),
                title: req.body.title,
                bloggerName: blogger.name,
                shortDescription: req.body.shortDescription,
                content: req.body.content,
                bloggerId: req.body.bloggerId
            }
            await postRepository.createPost(newPost)
            res.status(201).send(newPost)
        }
    })



postsRoute.put('/:id', authRouter,
    titleValidation, shortDescriptionValidation,
    contentValidation, inputValidationMiddleware,

    async (req: Request, res: Response) => {
        const post = await postRepository.getPostById(req.params.id)
        if (!post) {
            return res.send(404)
        }

        if (post.bloggerId !== req.body.bloggerId) {
            return res
                .status(400)
                .send({errorsMessages: [{message: 'Invalid bloggerId', field: "bloggerId"}]})
        }

        post.title = req.body.title
        post.shortDescription = req.body.shortDescription
        post.content = req.body.content

        res.send(204)
    })

postsRoute.get('/:id', async (req: Request, res: Response) => {
    let post = await postRepository.getPostById(req.params.id)
    if (post) {
        res.send(post)
    } else {
        res.send(404)
    }
})

postsRoute.get('/', async (req: Request, res: Response) => {
    const foundPost = await postRepository.findPost(req.query.title?.toString());
    res.send(foundPost)

})

postsRoute.delete('/:id', authRouter, (req: Request, res: Response) => {
    const isDeleted = postRepository.deletePost(req.params.id)
    if (isDeleted) {
        res.send(204)
    } else {
        res.send(404)
    }
})

