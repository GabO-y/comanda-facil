import type { PriceList } from "../models/PriceList.js"

export class PriceListRepository{

    private constructor(){}

    private static instance: PriceListRepository

    static getInstance(): PriceListRepository{
        if(this.instance == null){
            this.instance = new PriceListRepository()
        }
        return this.instance
    }

    private priceLists: Map<Number, PriceList> = new Map()

    save(priceList: PriceList): PriceList{
        const id = this.getNewId()
        priceList.id = id
        this.priceLists.set(id, priceList)
        return this.priceLists.get(id)!
    }

    findById(id: Number){
        return this.priceLists.get(id)
    }

    findAll(){
        const priceLists: PriceList[] = []
        for(let pl of this.priceLists.values()){
            priceLists.push(pl)
        }
        return priceLists
    }

    rewrite(id: Number, priceList: PriceList){

        if(!this.findById(id)) return

        this.priceLists.set(id, priceList)

        return this.priceLists.get(id)

    }

    private getNewId(): Number{
        let id = this.priceLists.size + 1
        while(this.priceLists.has(id)){
            id++
        }
        return id
    }

}