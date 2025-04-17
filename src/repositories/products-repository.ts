export type ProductType = {
    id: number
    title: string
}

const products: ProductType[] = [{id: 1, title: 'tomato'}, {id: 2, title: 'milk'}]

export const productsRepository = {
    async findProducts(title: string | null | undefined): Promise<ProductType[]> {
        if (title) {
            return products.filter(p => p.title.includes(title))
        } else {
            return products
        }
    },
    async findProductById(id: number): Promise<ProductType | undefined> {
        return products.find(p => p.id === id)
    },
    async createProduct(title: string): Promise<ProductType> {
        const newId = products[products.length - 1].id + 1
        const newProduct = {id: newId, title}
        products.push(newProduct)
        return newProduct
    },
    async updateProduct(id: number, title: string): Promise<boolean> {
        let product = products.find(x => x.id === id)
        if (product) {
            product.title = title
            return true
        } else {
            return false
        }
    },
    async deleteProduct(id: number): Promise<boolean> {
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                products.splice(i, 1)
                return true
            }
        }
        return false
    }
}