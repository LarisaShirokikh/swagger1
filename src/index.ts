import express, {Request, Response} from 'express'
const app = express()
const port = 3000

app.get('/', (req: Request, res: Response) => {
    let helloMessge = 'Hello World! Welcome!'
    res.send(helloMessge)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})