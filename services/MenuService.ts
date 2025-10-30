import { ItemMenu } from "../models/ItemMenu.js"
import { Menu } from "../models/Menu.js"
import type { Product } from "../models/Product.js"
import { MenuRepository } from "../repository/MenuRepository.js"
import { ProductService } from "./ProductService.js"

export class MenuService{

    private constructor(){}

    private static instance: MenuService

    static getInstance(): MenuService{
        if(this.instance == null){
            this.instance = new MenuService()
        }
        return this.instance
    }

     saveMenu(name: String){

        if(MenuRepository.getInstance().constainsName(name)){
            return {
                status: 409,
                error: `menu com nome: ${name}, já existe`
            }
        }

        const menu = new Menu(0, name, [])

        const newMenu = MenuRepository.getInstance().save(menu)

        return {
            status: 200,
            message: `menu: ${newMenu.name}, criado com sucesso`,
            menu: newMenu
        }

    }

    findAllMenus(){

        const menus = MenuRepository.getInstance().findAllMenus()

        return{
            status: 200,
            message: "todos os menus encontrados",
            menus: menus.map(m => ({
                id: m.id,
                name: m.name,
                items: m.items.map(i => ({
                    id: i.product.id,
                    name: i.product.name
                }))
            }))
        }

    }

    findById(id: Number){

        const m = MenuRepository.getInstance().findById(id)

        if (!m){
            return {
                status: 404,
                message: `menu com id: ${id}, não encontrado`
            }
        }
        
        return {
            status: 200,
            message: `menu encontrado com sucesso`,
            menu: {
                id: m.id,
                name: m.name,
                items: m.items.map(i => ({
                    id: i.product.id,
                    name: i.product.name
                }))
            }
        }

    }

    addItem(menuId: Number, productId: Number){

        const menuTarget = MenuRepository.getInstance().findById(menuId)
        if(!menuTarget){
            return{
                status: 404,
                error: `menu com id: ${menuId}, não encontrado`
            }
        }

        const productTarget = ProductService.getInstance().findById(productId)
        if(productTarget.status != 200) return productTarget

        const menu = menuTarget
        const product = productTarget.product!

        const item = this.createItemByProduct(product, menu)
        menu.items.push(item)

        MenuRepository.getInstance().rewrite(menuId, menu)

        return {
            status: 200,
            massage: `Item adicionado com sucesso`,
            item: {
                id: item.product.id,
                name: item.product.name,
                menu: item.menu.name
            }
        }

    }

    private createItemByProduct(product: Product, menu: Menu): ItemMenu{
        return new ItemMenu(product, menu, false, 0)
    }

}