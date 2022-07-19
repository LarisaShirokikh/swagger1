
import {Request, Response, Router} from "express";
import {body} from "express-validator";
import {bloggersRepository} from "../repositories/bloggers-repository";

import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";


export const bloggersRoute = Router({});


const nameValidation = body('name').trim().isLength({
    min: 5,
    max: 30
}).withMessage('Title should be from 5 to 30 symbols');

bloggersRoute.get('/', (req: Request, res: Response) => {
    let blogger = bloggersRepository.getBloggers()
    res.send(blogger)

})

bloggersRoute.post('/',(req: Request, res: Response) => {
    let newBlogger = bloggersRepository.createBlogger(req.body.name)
    res.status(201).send(newBlogger)
})

bloggersRoute.get('/:id', (req: Request, res: Response) => {
    let blogger = bloggersRepository.getBloggerById(req.params.id)
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

bloggersRoute.put('/:id', nameValidation, inputValidationMiddleware, (req: Request, res: Response) => {
    const blogger = bloggersRepository.updateBloggerByInputModel(req.params.id, req.body.name);
    if (blogger) {
        res.send(204)
    } else {
        res.send(404)
    }
})