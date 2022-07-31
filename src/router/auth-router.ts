import {NextFunction, Request, Response, Router} from "express";
import {bloggersService} from "../domain/bloggers-service";


export const authRouter = (req: Request, res: Response, next: NextFunction) => {

    const header = req.headers.authorization
    console.log('testAuth', header, 'Basic YWRtaW46cXdlcnR5')
    if (header != 'Basic YWRtaW46cXdlcnR5') {
        res.send(401)
    } else {
        next()
    }

}

//export const authRouter = Router({})

/*authRouter.post('/login',
    async (req: Request, res: Response) => {
        const blogger = await bloggersService.checkCredentials(req.body.loginOrEmail, req.body.password)
        if (blogger) {
            const token = await jwtService.createJWT(blogger)
            res.status(201).send(token)
        } else {
            res.sendStatus(401)
        }
    })

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        res.send(401)
        return
    }
    const token = req.headers.authorization.split('')[1]

    const bloggerId = await jwtService.getBloggerIdByToken(token)
    if (bloggerId) {
        req.blogger = await bloggersService.getBloggerById()
        next()
    }
    res.send(404)

}*/
