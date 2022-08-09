import {Request, Response, Router} from "express";
import {usersService} from "./../domain/users-service"
import {bloggersService} from "../domain/bloggers-service";

export const usersRouter = Router({})

usersRouter.post('/',
    async (req: Request, res: Response) => {
        const newUser = await usersService.createUser(req.body.login, req.body.email, req.body.password)
        res.status(201).send(newUser)
    })

usersRouter.get('/',
async (req: Request, res: Response) => {

    const users = await usersService.getAllUsers(
        // @ts-ignore
        req.query.PageNumber,
        req.query.PageSize
    )
    res.status(200).send(users);
})