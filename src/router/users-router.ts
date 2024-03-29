import {Request, Response, Router} from "express";
import {usersService} from "./../domain/users-service"

import {
    bloggerIdValidation,
    contentValidation, loginValidator, passwordValidator,
    shortDescriptionValidation,
    titleValidationCreate
} from "../middlewares/title-validation";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {authRouterBasic} from "../middlewares/auth-basic";

export const usersRouter = Router({})


usersRouter.get('/',
async (req: Request, res: Response) => {

    const users = await usersService.getAllUsers(
        // @ts-ignore
        req.query.PageNumber,
        req.query.PageSize
    )
    res.status(200).send(users);
})

usersRouter.post('/',
    authRouterBasic,
    loginValidator,
    passwordValidator,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
        const newUser = await usersService.createUser(req.body.login, req.body.password)

        if (!newUser) {
            res.status(400).send(
                {errorsMessages: [{message: "Problem with a user", field: "user "}]})
            return
        }

        res.status(201).send(newUser)
    })

usersRouter.delete('/:id',
    authRouterBasic, async (req: Request, res: Response) => {

    const isDeleted = await usersService
        .deleteUser(req.params.id)

    if (isDeleted) {
        res.send(204)
    } else {
        res.send(404)
    }
})