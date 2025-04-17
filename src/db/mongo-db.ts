import {MongoClient} from "mongodb";
import {ProductType} from "../repositories/products-db-repository";

const mongoUri = process.env.MONGO_URI || "mongodb://0.0.0.0:27017/?maxPoolSize=20&w=majority" // в env будет другая строка с паролем от бд

export const client = new MongoClient(mongoUri)
const db = client.db('shop');
export const productsCollection = db.collection<ProductType>('products')

export const runDb = async () => {
    try {
        await client.connect()
        await client.db("products").command({ping: 1}) // тестовый пинг
    } catch {
        console.error("Could not connect to mongodb")
        await client.close()
    }
}