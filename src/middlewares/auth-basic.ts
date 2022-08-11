import {NextFunction, Request, Response} from "express";

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