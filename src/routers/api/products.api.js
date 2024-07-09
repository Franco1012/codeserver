//import { Router } from "express"
//import gestorDeProductos from "../../app/fs/ProductManager.js"
import CustomRouter from "../CustomRouter.js"
import { create, read, readOne, paginate, update, destroy } from "../../controllers/products.controllers.js"
//import isTitle from "../../middlewares/isTitle.js"
//import uploader from "../../middlewares/multer.js"
//import isPhoto from "../../middlewares/isPhoto.js"
//import isValidAdmin from "../../middlewares/isValidAdmin.js"



class ProductsRouter extends CustomRouter {
    init() {
        this.read("/", ["PUBLIC"], read)
        this.read("/paginate", ["PUBLIC"], paginate) //ojo que los verbos no van en los endpoints, esto es una excepción a la regla
        this.read("/:pid", ["PUBLIC"], readOne)
        //this.create("/", uploader.single("photo"), ["PUBLIC"], isValidAdmin, isTitle, isPhoto, create)
        this.create("/", ["ADMIN"], create)
        this.update("/:pid", ["ADMIN"], update)
        this.destroy("/:pid", ["ADMIN"], destroy)
    }
}


const productsRouter = new ProductsRouter()
export default productsRouter.getRouter();


