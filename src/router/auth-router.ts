import {NextFunction, Request, Response, Router} from "express";


export const authRouter = (req: Request, res: Response, next: NextFunction) => {

    const header = req.headers.authorization

    if (header !== 'Basic YWRtaW46cXdlcnR5') {
        res.send(401)
        return
    } else {
        next()
        return
    }

}


