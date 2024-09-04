/*import { Router } from "express"*/
/*import gestorDeProductos from "../../app/fs/ProductManager.js"*/
/*import gestorDeProductos from "../../app/mongo/ProductManager.mongo.js"
import viewProducts from "./products.view.js"
import viewUsers from "./users.view.js"

const viewsRouter = Router()
viewsRouter.use("/products", viewProducts)
viewsRouter.use("/users", viewUsers)

viewsRouter.get("/", async (req, res, next) => {
  try {
    const products = await gestorDeProductos.read({})
    // console.log("estos son los productos: ",products)

    return res.render("index", { products })
  } catch (error) {
    return next(error)
  }
})

export default viewsRouter*/