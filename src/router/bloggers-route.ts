import {Request, Response, Router} from "express";
import {body} from "express-validator";
import {bloggersInMemoryRepository} from "../repositories/bloggers-db-repository";

import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {contentValidation, nameValidation, titleValidation, urlValidation} from "../middlewares/title-validation";
import {postRepository} from "../repositories/post-repository";
import {authMiddleware} from "../middlewares/auth-middleware";


export const bloggersRoute = Router({});


bloggersRoute.get('/', async (req: Request, res: Response) => {
    let blogger = await bloggersInMemoryRepository.getBloggers()
    res.send(blogger)

})

bloggersRoute.get('/', async (req: Request, res: Response) => {
    const foundBlogger = await bloggersInMemoryRepository.findBlogger(req.query.title?.toString());
    res.send(foundBlogger)

})

bloggersRoute.post('/',
    authMiddleware,
    nameValidation,
    urlValidation,
    inputValidationMiddleware,
    (req: Request, res: Response) => {
        let newBlogger = bloggersInMemoryRepository.createBlogger(req.body.name, req.body.youtubeUrl)
        res.status(201).send(newBlogger)
    })

bloggersRoute.put('/:id',
    authMiddleware,
    nameValidation,
    urlValidation,
    inputValidationMiddleware, contentValidation,
    (req: Request, res: Response) => {
        const blogger = bloggersInMemoryRepository.updateBloggerByInputModel(req.params.id,
            req.body.name, req.body.content, req.body.youtubeUrl);
        if (blogger) {
            res.send(204)
        } else {
            res.send(404)
        }
    })

bloggersRoute.get('/:id', (req: Request, res: Response) => {
    let blogger = bloggersInMemoryRepository.getBloggerById(+req.params.id)
    if (blogger) {
        res.send(blogger)
    } else {
        res.send(404)
    }

})

bloggersRoute.delete('/:id', authMiddleware, (req: Request, res: Response) => {
    const deleteBlogger = bloggersInMemoryRepository.deleteBlogger(req.params.id)
    if (deleteBlogger) {
        res.send(204)
    } else {
        res.send(404)
    }
})

