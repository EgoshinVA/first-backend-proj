import express, {Request, Response} from 'express'

const app = express()
const port = 3000

const users = [{id: '1', name: 'Dima'}, {id: '2', name: 'Ivan'}]
const products = [{id: 1, title: 'tomato'}, {id: 2, title: 'milk'}]

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
    if (req.query.title) {
        const searchString = req.query.title.toString()
        res.send(products.filter(p => p.title.includes(searchString)))
    } else {
        res.send(products)
    }

})
app.get('/products/:id', (req: Request, res: Response) => {
    let product = products.find(product => product.id === +req.params.id)
    if (product) {
        res.send(product)
    } else {
        res.send(404)
    }
})
app.delete('/products/:id', (req: Request, res: Response) => {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === +req.params.id) {
            products.splice(i, 1)
            res.send(204)
            return
        }
    }
    res.send(404)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})