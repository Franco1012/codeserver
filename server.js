import environment from "./src/utils/env.util.js";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
//import morgan from "morgan";
import winston from "./src/middlewares/winston.js"
import cookieParser from "cookie-parser";
import cors from "cors"
//importo el resultado de args.opts() desde args.util.js y le asigno un nombre de variable argsUtil
import argsUtil from "./src/utils/args.util.js";
import swaggerJSDoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";

import compression from "express-compression";
import session from "express-session";
//import fileStore from "session-file-store"
import MongoStore from "connect-mongo";
import cluster from "cluster";
import { cpus } from "os";
import configs from "./src/utils/swagger.util.js"
/*import { engine } from "express-handlebars"*/

import indexRouter from "./src/routers/index.router.js";
//import socketCb from "./src/routers/index.socket.js"
import errorHandler from "./src/middlewares/errorHandler.js";
import pathHandler from "./src/middlewares/pathHandler.js";
import __dirname from './utils.js';
//import dbConnect from "./src/utils/dbConnect.js";

//console.log(process.env.MONGO_URI);


const server = express();
const port = environment.PORT || argsUtil.p;
const ready = async () => {
    console.log("server ready on port " + port);
    //await dbConnect()
    //Incluimos la conexión a mongo desde el patrón factory
}
//creo un servidor de node,con el método nativo createServer,con las configuraciones del servidor express
const nodeServer = createServer(server);
//creo un servidor tcp, construyendo una instancia del servidor de socket pasando como "base" el servidor de node (ya que tcp, está basado en HTPP)
const socketServer = new Server(nodeServer)

const numOfProc = cpus().length //chequeo la cantidad de procesos disponibles según mi hardware(número de nuclesos en la pc)
if (cluster.isPrimary) { //si estoy en un proceso primario puedo forkear,crear procesos hijos
    for (let i = 1; i <= numOfProc; i++) {
        cluster.fork()
    }
    console.log("proceso primario")
} else {
    console.log("proceso worker" + process.pid)
    nodeServer.listen(port, ready);
}


//socketServer.on("connection", socketCb)
export { socketServer }


//estructura código handlebars
/*server.engine("handlebars", engine())
server.set('view engine', 'handlebars')
server.set('views', __dirname + '/src/views')*/
const specs = swaggerJSDoc(configs);

//middlewares
server.use(cookieParser(environment.SECRET_COOKIE))
server.use(cors({ origin: true, credential: true }))
//const FileSession = fileStore(session)
server.use(session({
    /*file store*/
    /*store: new FileSession({
        path: "./src/app/fs/files/sessions",
        ttl: 60 * 60
    }),*/
    store: new MongoStore({
        mongoUrl: process.env.MONGO_URI,
        ttl: 60 * 60
    }),
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true,
    /* cookie: {
         maxAge: 60*60*1000
     }*/
}))
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/public"))
server.use(winston);
server.use("/api/docs", serve, setup(specs));


server.use("/", indexRouter);
server.use(errorHandler);
server.use(pathHandler);
//console.log(argsUtil)

//console.log(environment)

//middleware compresión para mejorar el rendimiento del sitio web
server.use(
    compression({
        brotli: { enabled: true, zlib: {} },
    })
);

//middleware compresión para mejorar el rendimiento del sitio web
server.use(compression({
    brotli: { enabled: true, zlib: {} }
}
))

/*process.on("exit",(code=>{
    console.log("justo antes de cerrarse");
    console.log(code)
}))
process.on("uncaughtException",(exc)=>{
    console.log("excep no cacheada");
    console.log(exc)
})
process.on("message",(message)=>{
    console.log("cuando reciba mensaje de otro proceso")
    console.log(message)
})
console()
process.exit()*/