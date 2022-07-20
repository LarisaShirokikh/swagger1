
import {Request, Response, Router} from "express";
import {body} from "express-validator";
import {bloggersRepository} from "../repositories/bloggers-repository";

import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {contentValidation, nameValidation, titleValidation, urlValidation} from "../middlewares/title-validation";
import {postRepository} from "../repositories/post-repository";



export const bloggersRoute = Router({});



bloggersRoute.get('/', (req: Request, res: Response) => {
    let blogger = bloggersRepository.getBloggers()
    res.send(blogger)

})

bloggersRoute.get('/', (req: Request, res: Response) => {
    const foundBlogger = bloggersRepository.findBlogger(req.query.title?.toString());
    res.send(foundBlogger)

})

bloggersRoute.post('/',
    nameValidation,
    urlValidation,
    inputValidationMiddleware,
    (req: Request, res: Response) => {
    let newBlogger = bloggersRepository.createBlogger(req.body.name, req.body.youtubeUrl)
    res.status(201).send(newBlogger)
})

bloggersRoute.put('/:id',
    nameValidation,
    urlValidation,
    inputValidationMiddleware, contentValidation,
    (req: Request, res: Response) => {
    const blogger = bloggersRepository.updateBloggerByInputModel(req.params.id,
        req.body.name, req.body.content, req.body.youtubeUrl);
    if (blogger) {
        res.send(204)
    } else {
        res.send(404)
    }
})

bloggersRoute.get('/:id', (req: Request, res: Response) => {
    let blogger = bloggersRepository.getBloggerById(+req.params.id)
    if (blogger) {
        res.send(blogger)
    } else {
        res.send(404)
    }

})

bloggersRoute.delete('/:id', (req: Request, res: Response) => {
    const deleteBlogger = bloggersRepository.deleteBlogger(req.params.id)
    if (deleteBlogger) {
        res.send(204)
    } else {
        res.send(404)
    }
})

