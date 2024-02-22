import Product from "./product.js"
import { randomUUID as uuid } from 'crypto'

export default class Cart {
    constructor({ at, products }) {
        this.id = uuid()
        this.at = at
        this.products = this.removeUndefinedProps(products)
        this.total = this.getCartPrice()
    }
    removeUndefinedProps(products) {
        const productEntities = products   
            .filter(product => Reflect.ownKeys(product).length > 0)
            .map(product => new Product(product))

        return JSON.parse(JSON.stringify(productEntities))
    }

    getCartPrice() {
        return this.products
            .map(product => product.price)
            .reduce((prev, next) => prev + next, 0)
    }
}