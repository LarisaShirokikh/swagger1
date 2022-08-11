import {Request, Response, Router} from "express";
import {usersService} from "../domain/users-service";
import {jwtService} from "../application/jwt-service";
import {authRouterBasic} from "../middlewares/auth-basic";
import {loginValidator, passwordValidator} from "../middlewares/title-validation";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";

export const authRouter = Router({})

authRouter.post('/login',
    authRouterBasic,
    loginValidator,
    passwordValidator,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
        const user = await usersService.checkCredentials(req.body.login, req.body.password)
        if (!user) {
            res.sendStatus(401)
        } else {
            const token = await jwtService.createJWT(user)
            res.status(200).send(token)
        }
    })





