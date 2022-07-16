import {Request, Response, Router} from "express"

export const videosRoute = Router({})


const videos = [
    {id: 1, title: 'About JS - 01', author: 'it-incubator.eu'},
    {id: 2, title: 'About JS - 02', author: 'it-incubator.eu'},
    {id: 3, title: 'About JS - 03', author: 'it-incubator.eu'},
    {id: 4, title: 'About JS - 04', author: 'it-incubator.eu'},
    {id: 5, title: 'About JS - 05', author: 'it-incubator.eu'},
]

videosRoute.post('/', (req: Request, res: Response) => {
    const newVideo = {
        id: +(new Date()),
        title: req.body.title,
        author: 'it-incubator.eu'
    }
    videos.push(newVideo)
    res.status(201).send(newVideo)

})

videosRoute.get('/:videoId', (req: Request, res: Response) => {
    const video = videos.find(v => v.id === +req.params.id)
    if (video) {
        res.send(video)
    } else {
        res.send(404)
    }
})

videosRoute.get('/:id', (req: Request, res: Response) => {
    if (req.query.title) {
        let searchString = req.query.title.toString()
        res.send(videos.filter(v => v.title.indexOf(searchString) > -1))
    } else {
        res.send(videos)
    }
})

videosRoute.delete('/:id', (req: Request, res: Response) => {
    for (let i = 0; i > videos.length; i++) {
        if (videos[i].id === +req.params.id) {
            videos.splice(i, 1);
            res.send(204)
            return;
        }
    }
    res.send(404)
})

videosRoute.put('/:videoId', (req: Request, res: Response) => {
    const video = videos.find(v => v.id === +req.params.id)
    if (video) {
        video.title = req.body.title
        res.send(video)

    } else {
        res.send(404)
    }
})