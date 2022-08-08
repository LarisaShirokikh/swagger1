import {Request, Response, Router} from "express";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {
    contentValidation, titleValidationBloggersPosts,
    urlValidation, nameValidationCreate, shortDescriptionValidation
} from "../middlewares/title-validation";
import {authRouter} from "./auth-router";
import {bloggersService} from "../domain/bloggers-service";
import {bloggersDbRepository} from "../repositories/bloggers-db-repository";

export const bloggersRoute = Router({});


bloggersRoute.get('/', async (req: Request, res: Response) => {
// @ts-ignore
    const foundBlogger = await bloggersService.getBloggersArray(req.query.PageNumber,
        req.query.PageSize, req.query.SearchNameTerm)
    res.status(200).send(foundBlogger)
    return

})


bloggersRoute.get('/:id', async (req: Request, res: Response) => {
    const foundBlogger = await bloggersService.getBlogger(+req.params.id)
    if (foundBlogger) {
        res.status(200).send(foundBlogger)
        return
    } else {
        res.sendStatus(404)
        return
    }
})

bloggersRoute.post('/',
    authRouter,
    nameValidationCreate,
    urlValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {

        let newBlogger = await bloggersService.createdBlogger(req.body.name, req.body.youtubeUrl)
        if (newBlogger) {
            res.status(201).send(newBlogger)
            return
        } else {
            res.status(400)
            return

        }
    })

bloggersRoute.put('/:id',
    authRouter,
    nameValidationCreate,
    urlValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
        const blogger = await bloggersService.findBlogger(+req.params.id);
        if (blogger) {
            const newBlogger = await bloggersService.updateBlogger(+req.params.id, req.body.name, req.body.youtubeUrl)
            res.status(204).send(newBlogger)
            return
        } else {
            res.status(404)
            return
        }
    })


bloggersRoute.delete('/:id',
    authRouter,
    async (req: Request, res: Response) => {
        const isDeleted = await bloggersService.deleteBlogger(+req.params.id)
        if (isDeleted) {
            res.send(204)
            return
        }
    })


bloggersRoute.post('/:bloggerId/posts',
    authRouter,
    titleValidationBloggersPosts,
    shortDescriptionValidation,
    contentValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {

        const blogger = await bloggersDbRepository.itsBlogger(+req.params.bloggerId);
        if (!blogger) {
            res.status(404).send({errorsMessages: [{message: "Invalid", field: "bloggerId"}]});
        } else {
            const newPost = await bloggersService.createPostBloggerId(+req.params.bloggerId, req.body.title, req.body.shortDescription, req.body.content)

            if (newPost) {
                res.status(201).send(newPost)
            } else {
                res.status(400).send({
                    errorsMessages: [{
                        message: "Invalid",
                        field: "bloggerId"
                    }]
                })
            }
        }


})


bloggersRoute.get('/:bloggerId/posts',
    async (req: Request, res: Response) => {
        const blogger = await bloggersDbRepository.itsBlogger(+req.params.bloggerId);
        if (!blogger) {
            res.status(404).send({errorsMessages: [{message: "Invalid", field: "bloggerId"}]});
        } else {
            // @ts-ignore
            const posts = await bloggersService.getPostsByBloggerId(+req.params.bloggerId, req.query.PageNumber, req.query.PageSize);
            res.status(200).send(posts);
        }



    })