import {Router} from "express";
import {bloggers} from "../repositories/types";
import {authMiddleware} from "./auth-router";

export const feedbacksRouter = Router({})

feedbacksRouter.post('/', authMiddleware,
    async (req, res) => {
    const newPost = await  feedbacksService.sendFeedback(req.body.comment, req.blogger!._id)
        res.status(201).send(newPost)
    })

feedbacksRouter.get('/', async (req, res) => {
    const bloggers = await feedbaksService.allFeedbacks()
    res.send(bloggers)
})