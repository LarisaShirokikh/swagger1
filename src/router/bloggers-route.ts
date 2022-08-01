import {Request, Response, Router} from "express";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {contentValidation, nameValidation, urlValidation} from "../middlewares/title-validation";
import {authRouter} from "./auth-router";
import {bloggersService} from "../domain/bloggers-service";

export const bloggersRoute = Router({});


bloggersRoute.get('/', async (req: Request, res: Response) => {
    const Term = req.query.Term
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
    nameValidation,
    urlValidation,
    inputValidationMiddleware, contentValidation,
    async (req: Request, res: Response) => {

        let newBlogger = await bloggersService.createdBlogger(
            req.body.name, req.body.youtubeUrl)
        if (newBlogger) {
            res.status(201).send(newBlogger)
        } else {
            res.status(500)
        }
    })

bloggersRoute.put('/:id',
    authRouter,
    nameValidation,
    urlValidation,
    inputValidationMiddleware, contentValidation,
    async (req: Request, res: Response) => {
        const isUpdateSuccess = await bloggersService.updateBlogger(
            +req.params.id,
            req.body.name, req.body.youtubeUrl
        );

        if (isUpdateSuccess) {
            const isUpdated = await bloggersService.updateBlogger(
                +req.params.id,
                req.body.name, req.body.youtubeUrl);
            res.send(isUpdated)
        }
        res.send(404)
    })

bloggersRoute.delete('/:id', authRouter, async (req: Request, res: Response) => {
    const isDeleteSuccess = await bloggersService.deleteBlogger(+req.params.id)
    if (true) {
        res.send(204)
    } else {
        res.send(404)
    }
})


