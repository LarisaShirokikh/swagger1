import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    //const login = 'admin'
    //const password = 'qwerty'
    //const buffer = Buffer.from(`${login}:${password}`)
    //const base64Result = buffer.toString('base64')
    //const validHeader = `Basic ${base64Result}`

    //if valid next() else send(401)

    const header = req.headers.authorization
    //const errors = validationResult(req);
    console.log('testAuth', header, 'Basic YWRtaW46cXdlcnR5')
    if (header === 'Basic YWRtaW46cXdlcnR5') {
        next()
        return
    }
        res.send(401)

}

