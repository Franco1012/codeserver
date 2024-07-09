import argsUtil from "./args.util.js"
import { createLogger, format, addColors, transports } from "winston"

const { colorize, simple } = format
const { Console, File } = transports
const levels = { FATAL: 0, ERROR: 1, INFO: 2, HTTP: 3 }
const colors = { FATAL: "red", ERROR: "yellow", INFO: "blue", HTTP: "white" }
addColors(colors)

// Cargar la configuración del entorno
const { env } = argsUtil;
// Crear el logger basado en el entorno
let logger;
switch (env) {
    case "dev":
        logger = createLogger({
            levels,
            format: colorize(),
            transports: [
                new Console({ level: "HTTP", format: simple() }),
            ]
        });
        break;
    case "prod":
        logger = createLogger({
            levels,
            transports: [
                new Console({ level: "HTTP", format: simple() }),
                new File({ level: "ERROR", filename:  "./src/utils/errors/errors.log", format: simple() })
            ]
        });
        break;
    default:
        logger = createLogger({
            levels,
            format: colorize(),
            transports: [
                new Console({ level: "HTTP" })
            ]
        });
        break;
}

export default logger;

/*const logger = createLogger({
    levels,
    format: colorize(),
    transports: [
        new Console({ level: "HTTP", format: simple() }),
        new File({ level: "ERROR", format: simple(), filename: "./src/utils/errors/errors.log" })]

})*/
