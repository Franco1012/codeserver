//import { Router } from "express";
import CustomRouter from "./CustomRouter.js";
import { create, read, readOne, update, destroy } from "../../controllers/carts.controllers.js"


class CartsRouter extends CustomRouter {
    init() {
        this.create("/", ["USER"], create)
        this.read("/", ["USER"], read)
        this.read("/:cid", ["USER"], readOne);
        this.update("/:cid", ["USER"], update);
        this.destroy("/all", ["USER"], destroy)
        this.destroy("/:cid", ["USER"], destroy)
    }
}


const cartsRouter = new CartsRouter()
export default cartsRouter.getRouter()



