import {NextFunction, Request, Response, Router} from "express";
import {usersService} from "../domain/users-service";
import {jwtService} from "../application/jwt-service";

export const authRouter = Router({})

authRouter.post('/login',
    async (req: Request, res: Response) => {
        const user = await usersService.checkCredentials(req.body.loginOrEmail, req.body.password)
        if (user) {
            const token = await jwtService.createJWT(user)
            res.status(201).send(token)
        } else {
            res.sendStatus(401)
        }
    })


/*export const authRouter = (req: Request, res: Response, next: NextFunction) => {

    const header = req.headers.authorization

    if (header !== 'Basic YWRtaW46cXdlcnR5') {
        res.send(401)
        return
    } else {
        next()
        return
    }

}*/


