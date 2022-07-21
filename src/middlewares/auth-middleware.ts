import {NextFunction, Request, Response} from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const login = 'admin'
    const password = 'qwerty'
    const buffer = Buffer.from(`${login}:${password}`)
    const base64Result = buffer.toString('base64')
    const validHeader = `Basic ${base64Result}`

    //if valid next() else send(401)

    const header = req.headers.authorization
}
