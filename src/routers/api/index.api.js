//import { Router } from "express"
import CustomRouter from "./CustomRouter.js"
import productsRouter from "./products.api.js"
import usersRouter from "./users.api.js"
import cartsRouter from "./carts.api.js"
import ticketsRouter from "./tickets.api.js"

//import cookiesRouter from "./cookie.api.js"
import sessionsRouter from "./session.api.js"

class ApiRouter extends CustomRouter {
    init() {
        this.use("/products", productsRouter)
        this.use("/users", usersRouter)
        this.use("/carts", cartsRouter)
        this.use("/tickets", ticketsRouter)
        this.use("/sessions", sessionsRouter)
    }
}



const apiRouter = new ApiRouter()

export default apiRouter.getRouter()