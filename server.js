import environment from "./src/utils/env.util.js";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors"
//importo el resultado de args.opts() desde args.util.js y le asigno un nombre de variable argsUtil
import argsUtil from "./src/utils/args.util.js";
import compression from "express-compression";
import session from "express-session";
//import fileStore from "session-file-store"
import MongoStore from "connect-mongo";

/*import { engine } from "express-handlebars"*/

import indexRouter from "./src/routers/index.router.js";
//import socketCb from "./src/routers/index.socket.js"
import errorHandler from "./src/middlewares/errorHandler.js";
import pathHandler from "./src/middlewares/pathHandler.js";
import __dirname from './utils.js';
//import dbConnect from "./src/utils/dbConnect.js";
console.log(process.env.MONGO_URI);

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
nodeServer.listen(port, ready);
//socketServer.on("connection", socketCb)
export { socketServer }


//estructura código handlebars
/*server.engine("handlebars", engine())
server.set('view engine', 'handlebars')
server.set('views', __dirname + '/src/views')*/


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
server.use(morgan("dev"));


server.use("/", indexRouter);
server.use(errorHandler);
server.use(pathHandler);
//console.log(argsUtil)

console.log(environment)

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