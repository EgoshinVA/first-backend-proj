import {Request, Response, Router} from "express";
import {productsRepository} from "../repositories/products-repository";

export const productsRouter = Router({})

productsRouter.get('', (req: Request, res: Response) => {
    const foundProducts = productsRepository.findProducts(req.params.title);
    res.send(foundProducts)
})
productsRouter.get('/:id', (req: Request, res: Response) => {
    const product = productsRepository.findProductById(+req.params.id)
    if (product) {
        res.send(product)
    } else {
        res.send(404)
    }
})
productsRouter.delete('/:id', (req: Request, res: Response) => {
    const isProductDeleted = productsRepository.deleteProduct(+req.params.id)
    if (isProductDeleted) {
        res.send(204)
    } else {
        res.send(404)
    }
})
productsRouter.post('', (req: Request, res: Response) => {
    const newProduct = productsRepository.createProduct(req.body.title)
    res.status(201).send(newProduct)
})
productsRouter.put('/:id', (req: Request, res: Response) => {
    const isUpdated = productsRepository.updateProduct(+req.params.id, req.body.title)
    if (isUpdated) {
        res.send(productsRepository.findProductById(+req.params.id))
    } else {
        res.send(404)
    }
})