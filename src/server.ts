import express from "express"
import menuRouter from "../controllers/MenuController.js"
import productRouter from "../controllers/ProductController.js";
import priceListRouter from "../controllers/PriceListController.js";

const app = express()

app.listen(8080, () => console.log("Server ON"))


app.use(express.json());
app.use("/menu", menuRouter)
app.use("/product", productRouter)
app.use("/price-list", priceListRouter)

