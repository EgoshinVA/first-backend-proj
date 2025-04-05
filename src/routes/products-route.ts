import {Request, Response, Router} from "express";

const products = [{id: 1, title: 'tomato'}, {id: 2, title: 'milk'}]

export const productsRouter = Router({})

productsRouter.get('', (req: Request, res: Response) => {
    if (req.query.title) {
        const searchString = req.query.title.toString()
        res.send(products.filter(p => p.title.includes(searchString)))
    } else {
        res.send(products)
    }

})
productsRouter.get('/:id', (req: Request, res: Response) => {
    let product = products.find(product => product.id === +req.params.id)
    if (product) {
        res.send(product)
    } else {
        res.send(404)
    }
})
productsRouter.delete('/:id', (req: Request, res: Response) => {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === +req.params.id) {
            products.splice(i, 1)
            res.send(204)
            return
        }
    }
    res.send(404)
})
productsRouter.post('', (req: Request, res: Response) => {
    const newId = products[products.length - 1].id + 1
    const newProduct = {id: newId, title: req.body.title}
    products.push(newProduct)
    res.status(201).send(newProduct)
})
productsRouter.put('/:id', (req: Request, res: Response) => {
    let product = products.find(x => x.id === +req.params.id)
    if (product) {
        product.title = req.body.title
        res.send(product)
    } else {
        res.send(404)
    }
})