import express from 'express'
import bodyParser from 'body-parser'
import {productsRouter} from "./routes/products-router";

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use('/products', productsRouter)

//start app
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})