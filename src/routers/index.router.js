/*import { Router } from "express";
import apiRouter from "./api/index.api.js";
import viewsRouter from "./views/index.view.js";
const indexRouter=Router()

indexRouter.use("/api",apiRouter)
indexRouter.use("/", viewsRouter);*/
import CustomRouter from "./api/CustomRouter.js"
import apiRouter from "./api/index.api.js"
//extendemos la clase
class IndexRouter extends CustomRouter {
    init() {
        this.use("/api", apiRouter)
    }
}
const indexRouter = new IndexRouter()



export default indexRouter.getRouter()