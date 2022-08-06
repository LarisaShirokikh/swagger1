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
    const SearchNameTerm = req.query.SearchNameTerm?.toString()

    const PageNumber = req.query.PageNumber ? +req.query.PageNumber : 1
    const PageSize = req.query.PageSize ? +req.query.PageSize : 10

    const foundBlogger = await bloggersService.getBloggersArray(PageNumber,
        PageSize, SearchNameTerm);
    res.status(200).send(foundBlogger)
})


bloggersRoute.get('/:id', async (req: Request, res: Response) => {
    const foundBlogger = await bloggersService.getBlogger(+req.params.id)
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
            res.status(400)

        }
    })

bloggersRoute.put('/:id',
    authRouter,
    nameValidationCreate,
    urlValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
        const blogger = await bloggersService.updateBlogger(req.body.id, req.body.name, req.body.youtubeUrl);
        if (blogger) {
            res.status(204)
        }
        res.status(404)
    })


bloggersRoute.delete('/:id',
    authRouter,
    async (req: Request, res: Response) => {
        const isDeleted = await bloggersService.deleteBlogger(+req.params.id)
        if (isDeleted) {
            res.status(204)
        } else {
            res.status(404)
        }
    })


bloggersRoute.post('/:bloggerId/posts',
    authRouter,
    titleValidationBloggersPosts,
    shortDescriptionValidation,
    contentValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {

        let blogger = await bloggersService.getCountBloggerId(req.body.bloggerId)
        if (!blogger) {
            res.status(404)
        } else {
            const newPost = await bloggersService.createPost(req.body.title,
                req.body.shortDescription, req.body.content)
            res.status(201).send(newPost)
        }
    })

bloggersRoute.get('/:bloggerId/posts',
    async (req: Request, res: Response) => {
        const PageNumber = req.query.PageNumber ? +req.query.PageNumber : 1
        const PageSize = req.query.PageSize ? +req.query.PageSize : 10

        let blogger = await bloggersService.getBlogger(req.body.id)
        if (!blogger) {
            res.status(404)
        }
        const items = await bloggersDbRepository.getBloggers(PageNumber, PageSize)
        const totalCount = await bloggersDbRepository.getBloggersCount()
        const getCount = await bloggersDbRepository.getCount()
        return {
            pagesCount: Math.ceil(totalCount / PageSize),
            page: PageNumber,
            pageSize: PageSize,
            totalCount: totalCount,
            items: items
        }
        res.status(200)


    })