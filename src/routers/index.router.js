/*import { Router } from "express";
import apiRouter from "./api/index.api.js";
import viewsRouter from "./views/index.view.js";
const indexRouter=Router()

indexRouter.use("/api",apiRouter)
indexRouter.use("/", viewsRouter);*/
import { fork } from "child_process"
import CustomRouter from "./api/CustomRouter.js"
import apiRouter from "./api/index.api.js"

//extendemos la clase
class IndexRouter extends CustomRouter {
    init() {
        this.use("/api", apiRouter);
        this.read("/fork", ["PUBLIC"], (req, res, next) => {
            try {
                const childProcess = fork("./src/processes/sum.proc.js");//hacemos la conexión a un proceso hijo con fork
                childProcess.send("start")//ejecutamos el proceso
                //recibimos la respuesta de ese proceso
                childProcess.on("message", (result) => {
                    return res.json({ result });
                });

            } catch (error) {
                return next(error);
            }
        });
    }
}

const indexRouter = new IndexRouter()



export default indexRouter.getRouter()