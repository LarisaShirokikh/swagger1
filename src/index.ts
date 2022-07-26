import express, {Request, Response} from 'express'
import cors from 'cors'
import bodyParser from "body-parser"
import {videosRoute} from "./router/videos-route";
import {bloggersRoute} from "./router/bloggers-route";
import {postsRoute} from "./router/posts-route";
import {runDb} from "./repositories/db";


const app = express()
const port = process.env.PORT || 3000
app.use(cors())

const parserMiddleware = bodyParser({})
app.use(parserMiddleware)
app.use('/videos', videosRoute)
app.use('/bloggers', bloggersRoute)
app.use('/posts', postsRoute)


app.get('/', (req: Request, res: Response) => {
    let helloMessage = 'Hello World! Welcome! Oh, my God! '
    res.send(helloMessage)
})

const startApp = async () => {
    await runDb()
}
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
startApp()

