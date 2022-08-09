import {Router, Request, Response} from "express";
import {emailAdapter} from "../adapters/email-adapter";
import {businessService} from "../domain/business-service";

export const emailRouter = Router({})

emailRouter
.post('/send', async(req: Request, res: Response) => {
    await businessService.doOperation()
    res.send(200)
})