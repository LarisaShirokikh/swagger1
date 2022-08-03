import express from 'express'
import bodyParser from "body-parser"

import {bloggersRoute} from "./router/bloggers-route";
import {postsRoute} from "./router/posts-route";
import {runDb} from "./settings"
import cors from "cors"



const app = express()
const port = process.env.PORT || 3000

const parserMiddleware = bodyParser.json()
app.use(cors())
app.use(parserMiddleware)

app.use('/bloggers', bloggersRoute)
app.use('/posts', postsRoute)



const startApp = async () => {
    await runDb()
}
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
startApp()

