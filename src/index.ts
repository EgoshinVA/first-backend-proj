import express from 'express'
import bodyParser from 'body-parser'
import {productsRouter} from "./routes/products-router";
import {runDb} from "./db/mongo-db";

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use('/products', productsRouter)

const startApp = async () => {
    await runDb()
    app.listen(port, () => {
        console.log(`Server started on port: ${port}`)
    })
}

startApp()