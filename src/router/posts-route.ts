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


export const postsRouter = Router({})


postsRouter.get('/', async (req: Request, res: Response) => {
    // @ts-ignore
    const posts = await postsService.getAllPosts(req.query.PageNumber, req.query.PageSize)
    res.status(200).send(posts);
})

postsRouter.post('/',
    authRouter,
    titleValidationCreate,
    shortDescriptionValidation,
    contentValidation,
    //fieldsValidationMiddleware.bloggerIdValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
        const newPost = await postsService.createPost(req.body.title, req.body.shortDescription, req.body.content, req.body.bloggerId)

        if (!newPost) {
            res.status(400).send()
            return
        }

        res.status(201).send(newPost)
    })

postsRouter.put('/:postId',
    authRouter,
    titleValidationCreate,
    shortDescriptionValidation,
    contentValidation,
   // fieldsValidationMiddleware.bloggerIdValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {


        const blogger = await bloggersDbRepository.isBlogger(+req.body.bloggerId);

        if (!blogger) {
            res.status(400).send();
            return
        }

        const isUpdated = await postsService.updatePost(+req.params.postId, req.body.title, req.body.shortDescription, req.body.content, req.body.bloggerId)

        if (isUpdated) {
            const blogPost = await postsService.getPostById(+req.params.postId)
            res.status(204).send(blogPost);
        } else {
            res.send(404)
        }
    })

postsRouter.get('/:postId', async (req: Request, res: Response) => {

    if (typeof +req.params.postId !== "number") {
        res.send(400);
        return;
    }

    const post = await postsService.getPostById(+req.params.postId)

    if (post) {
        res.status(200).send(post);
    } else {
        res.send(404);
    }
})

postsRouter.delete('/:postId', authRouter, async (req: Request, res: Response) => {

    const isDeleted = await postsService.deletePost(+req.params.postId)

    if (isDeleted) {
        res.send(204)
    } else {
        res.send(404)
    }
})
