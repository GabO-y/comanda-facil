import Router from "express"
import { PriceListService } from "../services/PriceListService.js"

const priceListRouter = Router()

priceListRouter.get("/:id", (req, res) => {
    const id = Number(req.params.id)
    const result = PriceListService.getInstance().findById(id)
    res.status(result.status).json(result)
})

priceListRouter.put("/", (req, res) => {

    const priceListId = Number(req.body.priceListId)
    const productId = Number(req.body.productId)
    const price = Number(req.body.price)

    const result = PriceListService.getInstance().addItem(priceListId, productId, price)    
    res.status(result.status).json(result)

})

priceListRouter.get("/", (req, res) => {
    const result = PriceListService.getInstance().findAll()
    res.status(result.status).json(result)
})

priceListRouter.post("/", (req, res) => {
    const {name, begin, end, inEffect} = req.body
    const result = PriceListService.getInstance().createPriceList(name, begin, end, inEffect)
    res.status(result.status).json(result)
})


export default priceListRouter