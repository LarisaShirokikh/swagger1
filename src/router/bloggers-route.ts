import {Request, Response, Router} from "express";
import {body} from "express-validator";
import {bloggersService} from "../domain/bloggers-service";

import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {contentValidation, nameValidation, titleValidation, urlValidation} from "../middlewares/title-validation";
import {authMiddleware} from "../middlewares/auth-middleware";


export const bloggersRoute = Router({});


bloggersRoute.get('/', async (req: Request, res: Response) => {
    let blogger = await bloggersService.getBloggers()
    res.send(blogger)

})

bloggersRoute.get('/', async (req: Request, res: Response) => {
    const foundBlogger = await bloggersService.findBlogger(req.query.title?.toString());
    res.send(foundBlogger)

})

bloggersRoute.post('/',
    authMiddleware,
    nameValidation,
    urlValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
        let newBlogger = await bloggersService.createBlogger(req.body.name, req.body.youtubeUrl)
        res.status(201).send(newBlogger)
    })

bloggersRoute.put('/:id',
    authMiddleware,
    nameValidation,
    urlValidation,
    inputValidationMiddleware, contentValidation,
    async (req: Request, res: Response) => {
        const blogger = await bloggersService.updateBlogger(+req.params.id,
            req.body.name, req.body.content, req.body.youtubeUrl);
        if (blogger) {
            res.send(204)
        } else {
            res.send(404)
        }
    })

bloggersRoute.get('/:id', async (req: Request, res: Response) => {
    let blogger = await bloggersService.getBloggerById(+req.params.id)
    if (blogger) {
        res.send(blogger)
    } else {
        res.send(404)
    }

})

bloggersRoute.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
    const deleteBlogger = await bloggersService.deleteBlogger(+req.params.id)
    if (deleteBlogger) {
        res.send(204)
    } else {
        res.send(404)
    }
})

