import Router from "express"
import { ProductService } from "../services/ProductService.js"

const productRouter = Router()

productRouter.get("/:id", (req, res) => {
    const id = Number(req.params.id)
    const result = ProductService.getInstance().findById(id)
    res.status(result.status).json(result)
})

productRouter.get("/", (req, res) => {
    const result = ProductService.getInstance().findAll()
    res.status(result.status).json(result)
})

productRouter.post("/", (req, res) => {
    const name = req.body.name
    const result = ProductService.getInstance().addProduct(name)
    res.status(result.status).json(result)
})

export default productRouter