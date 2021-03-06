import {Request, Response, Router} from "express"
import {videosRepository} from "../repositories/videos-repository";

import {body} from "express-validator";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {titleValidation} from "../middlewares/title-validation";


export const videosRoute = Router({})




videosRoute.get('/', (req: Request, res: Response) => {
    console.log("LOG!!")
    let video = videosRepository.getVideos()
    res.send(video)

})

videosRoute.post('/', titleValidation, inputValidationMiddleware,(req: Request, res: Response) => {
    const newVideo = videosRepository.createVideo(req.body.title)
    res.status(201).send(newVideo)

})

videosRoute.get('/:id', (req: Request, res: Response) => {
    let video = videosRepository.getVideoById(req.params.id)
    if (video) {
        res.send(video)
    } else {
        res.send(404)
    }
})

videosRoute.get('/', (req: Request, res: Response) => {
    const foundVideo = videosRepository.findVideo(req.query.title?.toString());
    res.send(foundVideo)

})

videosRoute.delete('/:id', (req: Request, res: Response) => {
    const isDeleted = videosRepository.deleteVideo(req.params.id)
    if (isDeleted) {
        res.send(204)
    } else {
        res.send(404)
    }
})

videosRoute.put('/:id', titleValidation, inputValidationMiddleware, (req: Request, res: Response) => {
    const video = videosRepository.updateVideoTitle(req.params.id, req.body.title);
    if (video) {
        res.send(204)
    } else {
        res.send(404)
    }

})