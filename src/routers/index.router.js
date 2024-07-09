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
import logger from "../utils/winston.util.js";

//extendemos la clase
class IndexRouter extends CustomRouter {
    init() {
        this.use("/api", apiRouter);
        this.create("/api/nodemailer", ["PUBLIC"], async (req, res, next) => {
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
        this.read("/simplex", ["PUBLIC"], (req, res, next) => {
            try {
                let total = 1;
                for (let i = 1; i < 100; i++) {
                    total = i * i;
                }
                return res.send({ total });
            } catch (error) {
                return next(error)
            }

        });
        this.read("/complex", ["PUBLIC"], (req, res, next) => {
            try {
                let total = 1;
                for (let i = 1; i < 1000000000; i++) {
                    total = i * i;
                }
                return res.send({ total });
            } catch (error) {
                return next(error)
            }

        });
        // Endpoint para probar todos los logs
        this.read('/api/loggers', ["PUBLIC"], (req, res) => {
            logger.FATAL("This is a FATAL log");
            logger.ERROR("This is an ERROR log");
            logger.INFO("This is an INFO log");
            logger.HTTP("This is an HTTP log");

            res.send('Logs have been generated. Check your console and log files.');
        });
    }
}

const indexRouter = new IndexRouter()



export default indexRouter.getRouter()