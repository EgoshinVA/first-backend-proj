import {Request, Response, Router} from "express";
import {productsRepository} from "../repositories/products-repository";
import {authGuardMiddleware} from "../index";
import {body, validationResult} from "express-validator";

export const productsRouter = Router({})

productsRouter.get('', (req: Request, res: Response) => {
    const foundProducts = productsRepository.findProducts(req.query.title?.toString());
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
productsRouter.post('', authGuardMiddleware, body('title').trim().isLength({
    min: 3,
    max: 15
}).escape(), (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        const newProduct = productsRepository.createProduct(req.body.title)
        res.status(201).send(newProduct)
    }
    res.status(400).json({errors: errors.array()})
})
productsRouter.put('/:id', authGuardMiddleware, body('title').trim().isLength({
    min: 3,
    max: 15
}).escape(), (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        const isUpdated = productsRepository.updateProduct(+req.params.id, req.body.title)
        if (isUpdated) {
            res.send(productsRepository.findProductById(+req.params.id))
        } else {
            res.send(404)
        }
    }
    res.status(400).json({errors: errors.array()})
})