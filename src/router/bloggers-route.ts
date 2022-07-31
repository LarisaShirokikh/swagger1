import {Request, Response, Router} from "express";

import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {contentValidation, nameValidation, urlValidation} from "../middlewares/title-validation";
import {authRouter} from "./auth-router";
import {bloggersService} from "../domain/bloggers-service";


export const bloggersRoute = Router({});


bloggersRoute.get('/', async (req: Request, res: Response) => {
    const PageNumber = req.query.PageNumber ? +req.query.PageNumber : 1
    const PageSize = req.query.PageSize ? +req.query.PageSize : 10
    const foundBlogger = await bloggersService.getBloggersArray(PageNumber, PageSize);
    res.send(foundBlogger)



})

bloggersRoute.get('/:id', async (req: Request, res: Response) => {
    const foundBlogger = await bloggersService.getBloggerById(+req.params.id)
    if (foundBlogger) {
        res.send(foundBlogger)
    } else {
        res.send(404)
    }
})

bloggersRoute.post('/',
    authRouter,
    nameValidation,
    urlValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {

        let newBlogger = await bloggersService.createBlogger(
            req.body.name, req.body.youtubeUrl)
        res.status(201).send(newBlogger)
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
    if (isDeleteSuccess) {
        res.send(204)
    } else {
        res.send(404)
    }
})

/*bloggersRoute.post('/',
    async (req: Request, res: Response) => {
        const newBlogger = await bloggersService.createBloggerPass(req.body.login,
            req.body.email, req.body.password)
        res.status(201).send(newBlogger)
    }) */
