import express, {Request, Response} from 'express'
import cors from 'cors'
import bodyParser from "body-parser"
const app = express()
const port = process.env.PORT || 3000
app.use(cors())




const videos = [
    {id: 1, title: 'About JS - 01', author: 'it-incubator.eu'},
    {id: 2, title: 'About JS - 02', author: 'it-incubator.eu'},
    {id: 3, title: 'About JS - 03', author: 'it-incubator.eu'},
    {id: 4, title: 'About JS - 04', author: 'it-incubator.eu'},
    {id: 5, title: 'About JS - 05', author: 'it-incubator.eu'},
]



app.post('/videos', (req: Request, res: Response) => {
     const newVideo = {
         id: +(new Date()),
         title: req.body.title,
         author: 'it-incubator.eu'
     }
     videos.push(newVideo)
    res.status(201).send(newVideo)

})

app.get('/videos/:videoId', (req: Request, res: Response) => {
       const video = videos.find(v => v.id === +req.params.id)
       if (video) {
           res.send(video)
       } else {
           res.send(404)
       }
})

app.get('/videos/:id',(req: Request, res: Response) => {
   if(req.query.title) {
       let searchString = req.query.title.toString()
    res.send(videos.filter(v => v.title.indexOf(searchString) > -1))
    } else {
       res.send(videos)
   }
})

app.delete('/videos/:id',(req: Request, res: Response) => {
    for (let i = 0; i > videos.length; i++) {
        if (videos[i].id === +req.params.id) {
            videos.splice(i, 1);
            res.send(204)
            return;
        }
    }
    res.send(404)
})




app.get('/', (req: Request, res: Response) => {
    let helloMessage = 'Hello World! Welcome! Oh, my God! It is great!'
    res.send(helloMessage)
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})