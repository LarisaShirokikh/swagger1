import {Request, Response, Router} from "express";

import {contentValidation} from "../middlewares/title-validation";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {commentRepository} from "../repositories/comment-repository";
import {commentsService} from "../domain/commets-service";
import { authRouterBasic } from "../middlewares/auth-basic";

export const commentRouter = Router({})

commentRouter.put('/:commentId',
    authRouterBasic,
    contentValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
        const comment = await commentRepository.isComment(req.body.commentId);
        if (!comment) {
            res.status(400).send({
                errorsMessages: [{
                    message: "Problem with a commentId field", field: "commentId"
                }]
            })
            return
        }
        const isUpdated = await commentsService.updateComment(
            req.params.commentId,
            req.body.content
        )
        if (isUpdated) {
            const comment = await commentsService.getCommentById(
                req.params.commentId
            )
            res.status(200).send(comment);
        } else {
            res.send(404)
        }
    })

commentRouter.delete('/:commentId',
    authRouterBasic, async (req: Request, res: Response) => {

        const isDeleted = await commentsService.deleteComment(req.params.commentId)

        if (isDeleted) {
            res.send(204)
        } else {
            res.send(404)
        }
    })
