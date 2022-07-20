import {Request, Response, Router} from "express"

import {body} from "express-validator";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {
    contentValidation,
    nameValidation,
    shortDescriptionValidation,
    titleValidation,
    urlValidation
} from "../middlewares/title-validation";
import {postRepository, PostType} from "../repositories/post-repository";
import {bloggersRepository} from "../repositories/bloggers-repository";


export const postsRoute = Router({})

postsRoute.get('/', (req: Request, res: Response) => {
    let post = postRepository.getPosts()
    res.send(post)
})

postsRoute.post('/',
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    inputValidationMiddleware,
    (req: Request, res: Response) => {
        let blogger = bloggersRepository.getBloggerById(req.body.bloggerId)
        if (!blogger) {
            return res.status(400).send({errorsMessages: [{message: 'Invalid bloggerId', field: "bloggerId"}]})
        } else {
            const newPost: PostType = {
                id: +(new Date()),
                title: req.body.title,
                bloggerName: blogger.name,
                shortDescription: req.body.shortDescription,
                content: req.body.content,
                bloggerId: req.body.bloggerId
            }
            postRepository.createPost(newPost)
            res.status(201).send(newPost)
        }
    })

postsRoute.put('/:id',
    titleValidation, shortDescriptionValidation,
    contentValidation, inputValidationMiddleware,

    (req: Request, res: Response) => {
        const post = postRepository.getPostById(req.params.id)
        if (!post) {
            return res.send(404)
        }

        if (post.bloggerId !== req.body.bloggerId) {
            return res
                .status(400)
                .send({errorsMessages: [{message: 'Invalid bloggerId', field: "bloggerId"}]})
        }

        post.title = req.body.title
        post.shortDescription = req.body.shortDescription
        post.content = req.body.content

        res.send(204)
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
    const foundPost = postRepository.findPost(req.query.title?.toString());
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

