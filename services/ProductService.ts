import { Product } from "../models/Product.js"
import { ProductRepository } from "../repository/ProductRepository.js"

export class ProductService{

    private constructor(){}

    private static instance: ProductService

    static getInstance(): ProductService{
        if(this.instance == null){
            this.instance = new ProductService()
        }
        return this.instance
    }

    findById(productId: Number){

        const p = ProductRepository.getInstance().findById(productId)
        if (!p){
            return {
                status: 400,
                error: `produto com id: ${productId}, não encontrado`
            }
        }

        return {
            status: 200,
            message: `produto encontrado com sucesso`,
            product: p
        }

    }

    addProduct(name: String){

        const product = new Product(-1, name)

        return {
            status: 200,
            message: `produto criado com sucesso`,
            product: ProductRepository.getInstance().save(product)
        }

    }

    findAll(){

        const products = ProductRepository.getInstance().findAll()
        return{
            status: 200,
            message: `produtos achados`,
            products: products
        }

    }



}