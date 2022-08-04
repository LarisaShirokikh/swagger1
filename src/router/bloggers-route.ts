import {Request, Response, Router} from "express";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {
    contentValidation, shortDescriptionValidationBloggersPosts,
    titleValidationBloggersPosts,
    urlValidation, nameValidationCreate
} from "../middlewares/title-validation";
import {authRouter} from "./auth-router";
import {bloggersService} from "../domain/bloggers-service";
import {PostType} from "../repositories/types";
import {postsService} from "../domain/posts-service";
import {bloggersDbRepository} from "../repositories/bloggers-db-repository";

export const bloggersRoute = Router({});


bloggersRoute.get('/', async (req: Request, res: Response) => {
    const SearchNameTerm = req.query.SearchNameTerm
    const PageNumber = req.query.PageNumber ? +req.query.PageNumber : 1
    const PageSize = req.query.PageSize ? +req.query.PageSize : 10

    const foundBlogger = await bloggersService.getBloggersArray(PageNumber, PageSize);
    res.send(foundBlogger)


})

bloggersRoute.get('/:id', async (req: Request, res: Response) => {
    const foundBlogger = await bloggersService.getBloggerById(+req.params.id)
    if (foundBlogger) {
        res.status(200).send(foundBlogger)
    } else {
        res.send(404)
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
        } else {
            res.sendStatus(400)

        }
    })

bloggersRoute.put('/:id',
    authRouter,
    nameValidationCreate,
    urlValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
        const isFind = await bloggersService.findBlogger(req.body.id);
        if (isFind) {
            await bloggersService.updateBlogger(req.body.id, req.body.name, req.body.youtubeUrl)
            res.sendStatus(200)
        }
        res.sendStatus(204)


    })


bloggersRoute.delete('/:id',
    authRouter,
    async (req: Request, res: Response) => {
        const isDeleted = await bloggersService.deleteBlogger(+req.params.id)
        if (isDeleted) {
            res.send(204)
        } else {
            res.send(404)
        }
    })


bloggersRoute.post('/:bloggerId/posts',
    authRouter,
    titleValidationBloggersPosts,
    shortDescriptionValidationBloggersPosts,
    contentValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {

        let blogger = await bloggersService.getBloggerById(req.body.bloggerId)
        if (!blogger) {
            return res.status(404).send()
        } else {
            const newPost = {
                id: +(new Date()),
                title: req.body.title,
                shortDescription: req.body.shortDescription,
                content: req.body.content,
                bloggerId: req.body.bloggerId,
                bloggerName: blogger.name
            }
            res.status(201).send(newPost)
        }
    })

bloggersRoute.get('/:bloggerId/posts',
    async (req: Request, res: Response) => {
        const PageNumber = req.query.PageNumber ? +req.query.PageNumber : 1
        const PageSize = req.query.PageSize ? +req.query.PageSize : 10

        let blogger = await bloggersService.getBloggerById(req.body.bloggerId)
        if (!blogger) {
            res.sendStatus(404)
        }
        const items = await bloggersDbRepository.getBloggers(PageNumber, PageSize)
        const totalCount = await bloggersDbRepository.getBloggersCount(PageNumber, PageSize)
        const getCount = await bloggersDbRepository.getCount()
        return {
            pagesCount: Math.ceil(totalCount / PageSize),
            page: PageNumber,
            pageSize: PageSize,
            totalCount: totalCount,
            items: items
        }
        //const newPostBlogger = await postsService.createPost(newPost)
        res.sendStatus(200)


    })