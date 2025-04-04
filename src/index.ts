import express, {Request, Response} from 'express'

const app = express()
const port = 3000

const users = [{id: '1', name: 'Dima'}, {id: '2', name: 'Ivan'}]
const products = [{title: 'tomato'}, {title: 'milk'}]

app.get('/users', (req: Request, res: Response) => {
    res.send(users)
})

app.get('/users/:id', (req: Request, res: Response) => {
    const user = users.find(x => x.id === req.params.id)
    if (user) {
        res.send(user)
    } else {
        res.send(404)
    }
})

app.get('/products', (req: Request, res: Response) => {
    res.send(products)
})
app.get('/products/:productTitle', (req: Request, res: Response) => {
    let product = products.find(product => product.title === req.params.productTitle)
    if (product) {
        res.send(product)
    } else {
        res.send(404)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})