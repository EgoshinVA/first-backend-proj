import {Request, Response, Router} from "express";
import {body} from "express-validator";
import {inputValidationMiddleware} from "../middlewares/inputValidationMiddleware";
import {authGuardMiddleware} from "../middlewares/authGuardMiddleware";
import {ProductType} from "../types/product-types";
import {productsService} from "../domain/products-service";

export const productsRouter = Router({})
const titleValidation = body('title').trim().isLength({min: 3, max: 15}).escape()

productsRouter.get('', async (req: Request, res: Response) => {
    const foundProducts: ProductType[] = await productsService.findProducts(req.query.title?.toString());
    res.send(foundProducts)
})
productsRouter.get('/:id', async (req: Request, res: Response) => {
    const product: ProductType | null = await productsService.findProductById(+req.params.id)
    if (product) {
        res.send(product)
    } else {
        res.send(404)
    }
})
productsRouter.delete('/:id', async (req: Request, res: Response) => {
    const isProductDeleted: boolean = await productsService.deleteProduct(+req.params.id)
    if (isProductDeleted) {
        res.send(204)
    } else {
        res.send(404)
    }
})
productsRouter.post('', authGuardMiddleware, titleValidation, inputValidationMiddleware, async (req: Request, res: Response) => {
    const newProduct: ProductType = await productsService.createProduct(req.body.title)
    res.status(201).send(newProduct)
})
productsRouter.put('/:id', authGuardMiddleware, titleValidation, inputValidationMiddleware, async (req: Request, res: Response) => {
    const isUpdated: boolean = await productsService.updateProduct(+req.params.id, req.body.title)
    if (isUpdated) {
        res.send(await productsService.findProductById(+req.params.id))
    } else {
        res.send(404)
    }
})