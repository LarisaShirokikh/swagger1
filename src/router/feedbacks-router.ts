import {Router, Request, Response} from "express";
import {authRouter} from "./auth-router";
import {feedbacksService} from "../domain/feedbacks-service";

export const feedbacksRouter = Router({})

feedbacksRouter
    .post('/', authRouter,
    async (req, res) => {
    const newProduct = await feedbacksService.sendFeedback(req.body.comment, req.user!._id)
        res.status(201).send(newProduct)
    })
.get('/', async (req, res) => {
    const users = await feedbacksService.allFeedbacks()
    res.send(users)
})