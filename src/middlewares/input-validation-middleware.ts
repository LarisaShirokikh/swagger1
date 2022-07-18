import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";

export const inputValidationMiddleware = (req: Request, res: Response,
                                        next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
  return res.status(400).send({
      errorsMessages: [
          {
              message: "string",
              field: "string"
          }
      ]
})
    } else {
        next()
    }
}