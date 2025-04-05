const products = [{id: 1, title: 'tomato'}, {id: 2, title: 'milk'}]

export const productsRepository = {
    findProducts(title: string | null | undefined) {
        if (title) {
            return products.filter(p => p.title.includes(title))
        } else {
            return products
        }
    },
    findProductById(id: number) {
        return products.find(p => p.id === id)
    },
    createProduct(title: string) {
        const newId = products[products.length - 1].id + 1
        const newProduct = {id: newId, title}
        products.push(newProduct)
        return newProduct
    },
    updateProduct(id: number, title: string) {
        let product = products.find(x => x.id === id)
        if (product) {
            product.title = title
            return true
        } else {
            return false
        }
    },
    deleteProduct(id: number) {
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                products.splice(i, 1)
                return true
            }
        }
        return false
    }
}