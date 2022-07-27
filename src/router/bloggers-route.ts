import {Request, Response, Router} from "express";
import {bloggersService} from "../domain/bloggers-service";

import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {contentValidation, nameValidation, urlValidation} from "../middlewares/title-validation";
import {authMiddleware} from "../middlewares/auth-middleware";


export const bloggersRoute = Router({});


bloggersRoute.get('/', async (req: Request, res: Response) => {
    let bloggers = await bloggersService.getBloggers()
    console.log(bloggers)
    if (bloggers) {
        res.status(200).send(bloggers)
        return
    }
    res.send(404)
    return

})

bloggersRoute.get('/:id', async (req: Request, res: Response) => {
    const foundBlogger = await bloggersService.findBlogger(+req.params.id)
    res.send(foundBlogger)

})

bloggersRoute.post('/',
    authMiddleware,
    nameValidation,
    urlValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
        let newBlogger = await bloggersService.createBlogger(req.body.id,
            req.body.name, req.body.youtubeUrl)
        res.status(201).send(newBlogger)
    })

bloggersRoute.put('/:id',
    authMiddleware,
    nameValidation,
    urlValidation,
    inputValidationMiddleware, contentValidation,
    async (req: Request, res: Response) => {
        const isUpdateSuccess = await bloggersService.updateBlogger(
            +req.params.id,
            req.body.name, req.body.youtubeUrl
        );

        if (isUpdateSuccess) {
            res.send(204)
        } else {
            res.send(404)
        }
    })

bloggersRoute.get('/:id', async (req: Request, res: Response) => {
    let blogger = await bloggersService.getBloggerById(+req.params.id)
    if (blogger) {
        res.send(200)
    } else {
        res.send(404)
    }

})

bloggersRoute.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
    const isDeleteSuccess = await bloggersService.deleteBlogger(+req.params.id)
    if (isDeleteSuccess) {
        res.send(204)
    } else {
        res.send(404)
    }
})

