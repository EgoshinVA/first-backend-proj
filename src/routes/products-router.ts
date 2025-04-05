import {Request, Response, Router} from "express";
import {productsRepository} from "../repositories/products-repository";
import {body} from "express-validator";
import {inputValidationMiddleware} from "../middlewares/inputValidationMiddleware";
import {authGuardMiddleware} from "../middlewares/authGuardMiddleware";

export const productsRouter = Router({})
const titleValidation = body('title').trim().isLength({min: 3, max: 15}).escape()

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
productsRouter.post('', authGuardMiddleware, titleValidation, inputValidationMiddleware, (req: Request, res: Response) => {
    const newProduct = productsRepository.createProduct(req.body.title)
    res.status(201).send(newProduct)
})
productsRouter.put('/:id', authGuardMiddleware, titleValidation, inputValidationMiddleware, (req: Request, res: Response) => {
    const isUpdated = productsRepository.updateProduct(+req.params.id, req.body.title)
    if (isUpdated) {
        res.send(productsRepository.findProductById(+req.params.id))
    } else {
        res.send(404)
    }
})