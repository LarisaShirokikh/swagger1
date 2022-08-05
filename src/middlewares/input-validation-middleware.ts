import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";


export const inputValidationMiddleware = (req: Request,
                                          res: Response, next: NextFunction) => {

    const errors = validationResult(req);
    console.log(errors)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errorsMessages: errors.array({onlyFirstError: true}).map(error => ({
                "message": error.param,
                "field": error.param
            }))
        })
    } else {
        next()
    }
}

export const inputValidationPost = (req: Request, res: Response,
                                    next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errorsMessages: errors.array({onlyFirstError: true}).map(error => ({
                "message": error.value,
                "field": error.value
            }))
        })
    } else {
        next()
    }
}