import Router from "express"
import { MenuService } from "../services/MenuService.js"

const menuRouter = Router()

menuRouter.put("/item", (req, res) => {
    const productId = Number(req.body.productId)
    const menuId = Number(req.body.menuId)
    const result = MenuService.getInstance().addItem(menuId, productId)
    res.status(result.status).json(result)
})

menuRouter.get("/:id", (req, res) => {
    const id = Number(req.params.id)
    const result = MenuService.getInstance().findById(id)
    res.status(result.status).json(result)
})

menuRouter.get("/", (req, res) => {
    const result = MenuService.getInstance().findAllMenus()
    res.status(result.status).json(result)
})

menuRouter.post("/", async (req, res) => {
    const name = req.body.name
    const result = await MenuService.getInstance().saveMenu(name)
    console.log(result)
    res.status(result.status).json(result)
})

export default menuRouter