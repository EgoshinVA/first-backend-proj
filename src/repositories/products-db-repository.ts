import {client} from "../db/mongo-db";

export type ProductType = {
    id: number
    title: string
}

export const productsRepository = {
    async findProducts(title: string | null | undefined): Promise<ProductType[]> {
        if (title) {
            return client.db('shop').collection<ProductType>('products').find({title: {$regex: title}}).toArray()
        } else {
            return client.db('shop').collection<ProductType>('products').find({}).toArray()
        }
    },
    async findProductById(id: number): Promise<ProductType | null> {
        let product: ProductType | null = await client.db('shop').collection<ProductType>('products').findOne({id})
        if (product) {
            return product
        } else {
            return null
        }
    },
    async createProduct(title: string): Promise<ProductType> {
        const newProduct = {
            id: +(new Date()),
            title
        }
        await client.db('shop').collection<ProductType>('products').insertOne(newProduct)
        return newProduct
    },
    async updateProduct(id: number, title: string): Promise<boolean> {
        const result = await client.db('shop').collection<ProductType>('products').updateOne({id}, {$set: {title}})
        return result.matchedCount === 1
    },
    async deleteProduct(id: number): Promise<boolean> {
        const result = await client.db('shop').collection<ProductType>('products').deleteOne({id})
        return result.deletedCount === 1
    }
}