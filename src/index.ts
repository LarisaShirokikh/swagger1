import express, {Request, Response} from 'express'
import cors from 'cors'
const app = express()
const port = process.env.PORT || 3000




const videos = [
    {id: 1, title: 'About JS - 01', author: 'it-incubator.eu'},
    {id: 2, title: 'About JS - 02', author: 'it-incubator.eu'},
    {id: 3, title: 'About JS - 03', author: 'it-incubator.eu'},
    {id: 4, title: 'About JS - 04', author: 'it-incubator.eu'},
    {id: 5, title: 'About JS - 05', author: 'it-incubator.eu'},
]

app.use(cors())
app.get('/videos', (req: Request, res: Response) => {
    res.send(videos)
})

app.post('/videos', (req: Request, res: Response) => {
    const newVideo = {
        id: +(new Date()),
        title: req.body.title,
        author: 'it-incubator.eu'
    }
    videos.push(newVideo)
    res.send(newVideo)
})

app.get('/videos/:videoId', (req: Request, res: Response) => {
    let id = +req.params.videoId;
    // FIND VIDEO AND RETURN IT
    // IF VIDEO IS NOW EXISTS THEN RETURN 404 CODE
})


app.get('/', (req: Request, res: Response) => {
    let helloMessage = 'Hello World! Welcome! Oh, my God! It is great!'
    res.send(helloMessage)
})

app.delete('/videos/:id',(req: Request, res: Response)=>{
    // put your code here
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})