import {Request, Response, Router} from "express"
import {videosRepository} from "../repositories/videos-repository";
import {create} from "domain";


export const videosRoute = Router({})


videosRoute.post('/', (req: Request, res: Response) => {
    const newVideo = videosRepository.createVideo(req.body.title)
    res.status(201).send(newVideo)

})

videosRoute.get('/:videoId', (req: Request, res: Response) => {
    let video = videosRepository.getVideoById(+req.params.id)
    if (video) {
        res.send(video)
    } else {
        res.send(404)
    }
})

videosRoute.get('/:id', (req: Request, res: Response) => {
    const foundVideo = videosRepository.findVideo(req.query.title?.toString());
    res.send(foundVideo)

})

videosRoute.delete('/:id', (req: Request, res: Response) => {
    const isDeleted = videosRepository.deleteVideo(+req.params.id)
    if (isDeleted) {
        res.send(204)
    } else {
        res.send(404)
    }
})

videosRoute.put('/:id', (req: Request, res: Response) => {
    const isUpdated = videosRepository.updateVideo(+req.params.id, req.body.title)
    if (isUpdated) {
        const video = videosRepository.findVideoById(+req.params.id)
        res.send(video)
    } else {
        res.send(404)
    }
})