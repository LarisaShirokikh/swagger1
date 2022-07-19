import {Request, Response, Router} from "express"

import  {body} from "express-validator";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {nameValidation, titleValidation, urlValidation} from "../middlewares/title-validation";
import {postRepository} from "../repositories/post-repository";




export const postsRoute = Router({})

postsRoute.get('/',(req: Request, res: Response) => {
    let post = postRepository.getPosts()
    res.send(post)
})

postsRoute.post('/',
    titleValidation,
    inputValidationMiddleware,
    urlValidation,
    (req: Request, res: Response) => {
    const newPost = postRepository.createPost(req.body.title)
    res.status(201).send(newPost)
})

postsRoute.get('/:id', (req: Request, res: Response) => {
    let post = postRepository.getPostById(req.params.id)
    if (post) {
        res.send(post)
    } else {
        res.send(404)
    }
})

postsRoute.get('/', (req: Request, res: Response) => {
    const foundPost = postRepository .findPost(req.query.title?.toString());
    res.send(foundPost)

})

postsRoute.delete('/:id', (req: Request, res: Response) => {
    const isDeleted = postRepository.deletePost(req.params.id)
    if (isDeleted) {
        res.send(204)
    } else {
        res.send(404)
    }
})

postsRoute.put('/:id',
    titleValidation,
    inputValidationMiddleware,
    urlValidation,
    (req: Request, res: Response) => {
    const post = postRepository.updatePostTitle(req.params.id, req.body.title);
    if (post) {
        res.send(204)
    } else {
        res.send(404)
    }

})