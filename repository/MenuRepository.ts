import type { Menu } from "../models/Menu.js"

export class MenuRepository{

    private constructor(){}

    private static instance: MenuRepository

    static getInstance(): MenuRepository{
        if(this.instance == null){
            this.instance = new MenuRepository()
        }
        return this.instance
    }

    private menus: Map<Number, Menu> = new Map()

    save(menu: Menu): Menu {
        
        const id = this.getNewId()

        menu.id = id
        this.menus.set(id, menu)

        console.log(this.menus)

        return this.menus.get(id)!

    }

   
    findAllMenus(){


        const menus: Menu[] = []

        for(let menu of this.menus.values()){
            menus.push(menu)
        }

        return menus
    }

    private getNewId(): Number{

        let id = this.menus.size + 1
        while(this.menus.has(id)){
            id++
        }
        return id

    }

    findById(id: Number){
        return this.menus.get(id)
    }

    rewrite(id: Number, menu: Menu){

        if (!this.menus.has(id)){
            return 
        }

        this.menus.set(id, menu)

    }

    constainsName(name: String){

        for(let m of this.menus.values()){
            if(m.name == name){
                return true
            }
        }

        return false

    }

}