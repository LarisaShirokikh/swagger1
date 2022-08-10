import {Request, Response, Router} from "express"

import {inputValidationMiddleware, } from "../middlewares/input-validation-middleware";
import {
    bloggerIdValidation,
    contentValidation,
    shortDescriptionValidation,
    titleValidationCreate
} from "../middlewares/title-validation";
import {authRouter, authRouterBasic} from "./auth-router";
import {postsService} from "../domain/posts-service";
import {bloggersDbRepository} from "../repositories/bloggers-db-repository";
import {bloggersService} from "../domain/bloggers-service";
import {postDbRepository} from "../repositories/post-db-repository";


export const postsRouter = Router({})


postsRouter.get('/', async (req: Request, res: Response) => {

    const posts = await postsService.getAllPosts(
        // @ts-ignore
        req.query.PageNumber,
        req.query.PageSize)
    res.status(200).send(posts);
})

postsRouter.post('/',
    authRouterBasic,
    titleValidationCreate,
    shortDescriptionValidation,
    contentValidation,
    bloggerIdValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
        const newPost = await postsService.createPost(req.body.title, req.body.shortDescription, req.body.content, req.body.bloggerId)

        if (!newPost) {
            res.status(400).send(
                {errorsMessages: [{message: "Problem with a bloggerId field", field: "bloggerId"}]})
            return
        }

        res.status(201).send(newPost)
    })

postsRouter.put('/:postId',
    authRouterBasic,
    titleValidationCreate,
    shortDescriptionValidation,
    contentValidation,
   bloggerIdValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {


        const blogger = await bloggersDbRepository.isBlogger(req.body.bloggerId);

        if (!blogger) {
            res.status(400).send(
                {errorsMessages: [{message: "Problem with a bloggerId field", field: "bloggerId"}]})
            return
        }

        const isUpdated = await postsService.updatePost(
            req.params.postId,
            req.body.title,
            req.body.shortDescription,
            req.body.content,
            req.body.bloggerId)

        if (isUpdated) {
            const blogPost = await postsService.getPostById(
                req.params.postId
            )
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

    const post = await postsService.getPostById(req.params.postId)

    if (post) {
        res.status(200).send(post);
    } else {
        res.send(404);
    }
})

postsRouter.delete('/:postId',
    authRouter, async (req: Request, res: Response) => {

    const isDeleted = await postsService.deletePost(req.params.postId)

    if (isDeleted) {
        res.send(204)
    } else {
        res.send(404)
    }
})

postsRouter.get('/:postsId/comments',
    async (req: Request, res: Response) => {

        const post = await postDbRepository.isPost(req.params.postId);
        if (!post) {
            res.status(404).send({errorsMessages: [{message: "Problem with a postId field", field: "postId"}]});
        } else {
            // @ts-ignore
            const comments = await postsService
                .getCommentsByPostId(req.params.postId, req.query.pageNumber, req.query.pageSize);
            res.status(200).send(comments);
        }
    }
)
