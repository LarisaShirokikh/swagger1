import {NextFunction, Request, Response} from "express";
import {jwtService} from "../application/jwt-service";
import {usersService} from "../domain/users-service";

export const authRouterBasic = (req: Request, res: Response, next: NextFunction) => {

    const header = req.headers.authorization

    if (header !== 'Basic YWRtaW46cXdlcnR5') {
        res.send(401)
        return
    } else {
        next()
        return
    }

}

export const authBarer = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        res.sendStatus(401)
        return
    }
    const token = req.headers.authorization.split(' ')[1]
    const userId = await jwtService.getUserIdByToken(token)
    if (userId) {
        req.user = await usersService.findUserById(userId)
        next()
    }
    res.sendStatus(401)
}