import {Request, Response, Router} from "express"
import {videosRepository} from "../repositories/videos-repository";
import {create} from "domain";
import {body} from "express-validator";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";


export const videosRoute = Router({})

const titleValidation = body('title').trim().isLength({
    min: 5,
    max: 30
}).withMessage('Title should be from 1 to 30 symbols');



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
        res.send(400)
    }

})