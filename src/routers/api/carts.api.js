//import { Router } from "express";
import CustomRouter from "../CustomRouter.js";
import { create, read, readOne, update, destroy } from "../../controllers/carts.controllers.js"
import checkRoleAndAuthorizePurchase from "../../middlewares/checkRoleAndAuthorizePurchase.js";

class CartsRouter extends CustomRouter {
    init() {
        this.create("/", ["USER", "ADMIN", "PREMIUM"],checkRoleAndAuthorizePurchase, create)
        this.read("/", ["USER", "ADMIN", "PREMIUM"], read)
        this.read("/:cid", ["USER", "ADMIN", "PREMIUM"], readOne);
        this.update("/:cid", ["USER", "ADMIN", "PREMIUM"], update);
        this.destroy("/all", ["USER", "ADMIN", "PREMIUM"], destroy)
        this.destroy("/:cid", ["USER", "ADMIN", "PREMIUM"], destroy)
    }
}


const cartsRouter = new CartsRouter()
export default cartsRouter.getRouter()



