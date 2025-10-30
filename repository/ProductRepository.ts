import type { Product } from "../models/Product.js"

export class ProductRepository{

    private constructor(){}

    private static instance: ProductRepository

    static getInstance(): ProductRepository{
        if(this.instance == null){
            this.instance = new ProductRepository()
        }
        return this.instance
    }

    private products: Map<Number, Product> = new Map()

    save(product: Product): Product{
        
        const id = this.getNewId()

        product.id = id
        this.products.set(id, product)

        return this.products.get(id)!

    }

    getNewId(): Number{

        let newId = this.products.size + 1
        while(this.products.has(newId)){
            newId++
        }
        return newId

    }

    findById(id: Number){
        return this.products.get(id)
    }

    findAll(){
        const products: Product[] = []
        for(let p of this.products.values()){
            products.push(p)
        }
        return products
    }

}