/*import { Router } from "express";
import apiRouter from "./api/index.api.js";
import viewsRouter from "./views/index.view.js";
const indexRouter=Router()

indexRouter.use("/api",apiRouter)
indexRouter.use("/", viewsRouter);*/
import { fork } from "child_process"
import CustomRouter from "./CustomRouter.js"
import apiRouter from "./api/index.api.js"
import sendEmail from "../utils/mailing.util.js";

//extendemos la clase
class IndexRouter extends CustomRouter {
    init() {
        this.use("/api", apiRouter);
        this.create("/api/nodemailer",["PUBLIC"],async (req, res, next) => {
            try {
                const { email, name } = req.body
                await sendEmail({ to: email, name })
                return res.message200("EMAIL SENT")
            } catch (error) {
                return next(error)
            }
        })
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