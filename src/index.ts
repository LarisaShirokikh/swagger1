import express, {Request, Response} from 'express'
import cors from 'cors'
import bodyParser from "body-parser"
import {videosRoute} from "./router/videos-route";

const app = express()
const port = process.env.PORT || 3000

const parserMiddleware = bodyParser({})
app.use(parserMiddleware)



app.get('/', (req: Request, res: Response) => {
    let helloMessage = 'Hello World! Welcome! Oh, my God! It is great!'
    res.send(helloMessage)
})

app.use('/videos', videosRoute)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

