import {NextFunction, Request, Response} from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const header = req.headers.authorization
    console.log('testAuth', header, 'Basic YWRtaW46cXdlcnR5')
    if (header !== 'Basic YWRtaW46cXdlcnR5') {
        res.send(401)
    } else {
        next()
    }


}

