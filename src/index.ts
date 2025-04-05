import express, {NextFunction, Request, Response} from 'express'
import bodyParser from 'body-parser'
import {productsRouter} from "./routes/products-router";

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use('/products', productsRouter)

export function authGuardMiddleware(req: Request, res: Response, next: NextFunction) {
    if (req.body.token === '123') {
        next()
    } else {
        res.send(401)
    }
}

//start app
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})