import { ItemPriceList, type ItemPriceListRequest } from "../models/ItemPriceList.js"
import { PriceList } from "../models/PriceList.js"
import type { Product } from "../models/Product.js"
import { PriceListRepository } from "../repository/PriceListRepository.js"
import { ProductService } from "./ProductService.js"

export class PriceListService{

    private constructor(){}

    private static instance: PriceListService

    static getInstance(): PriceListService{
        if(this.instance == null){
            this.instance = new PriceListService()
        }
        return this.instance
    }

    createPriceList(name: String, begin: Date, end: Date, inEffect: Boolean){

        let priceList = new PriceList(-1, name, inEffect, begin, end, [])

        priceList = PriceListRepository.getInstance().save(priceList)

        return {
            status: 200,
            message: `tabela de preços criada com sucesso`,
            priceList: this.toRequest(priceList)
        }

    }

    findById(id: Number){

        const priceList = PriceListRepository.getInstance().findById(id)
        if(!priceList){
            return{
                status: 404,
                error: `tabela de preços com id: ${id}, não encontrado`
            }
        }

        return {
            status: 200,
            message: `tabela de preços encontrado com sucesso`,
            priceList: this.toRequest(priceList)

        }

    }

    findAll(){

        return {
            status: 200,
            message: `todas as tabelas de preços encontradas`,
            priceLists: PriceListRepository.getInstance().findAll().map(pl => this.toRequest(pl))
        }

    }

    addItem(priceListId: Number, productId: Number, price: Number){

        const priceList = PriceListRepository.getInstance().findById(priceListId)
        if(!priceList){
            return {
                status: 404, 
                error: `tabela de preços com id: ${priceListId}, não encontrado`
            }
        }

        const productIdTarget = ProductService.getInstance().findById(priceListId)
        if(productIdTarget.status != 200){
            return productIdTarget
        }

        const product = productIdTarget.product!

        const item = this.createItem(product, priceList, price)

        priceList.items.push(item)

        PriceListRepository.getInstance().rewrite(priceList.id, priceList)

        return {
            status: 200,
            message: `item adicionado com sucesso`,
            item: {
                id: item.product.id,
                name: item.product.name,
                price: item.price
            }
        }

    }

    private toRequest(entity: PriceList){

        const items: ItemPriceListRequest[] = []

        for(let i of entity.items){
            items.push({
                id: i.product.id,
                name: i.product.name,
                price: i.price
            })
        }

        const request: PriceListRequest = {
            id: entity.id,
            name: entity.name,
            beginDate: entity.beginDate,
            endDate: entity.endDate,
            inEffect: entity.inEffect,
            items: items
        }

        return request

    }

    private createItem(product: Product, priceList: PriceList, price: Number): ItemPriceList{
        return new ItemPriceList(product, price, priceList)
    }

}


export interface PriceListRequest {
  id: Number
  name: String
  beginDate: Date
  endDate: Date
  inEffect: Boolean
  items: ItemPriceListRequest[]
}