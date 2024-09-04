import { config } from "dotenv"
import argsUtil from "./args.util.js"

const { env } = argsUtil //me traigo en que ambiente estoy
// si env es dev debo usar env.dev
//si env es prod debo usar env.prod
const path = env === "prod" ? "./.env.prod" : env === "test" ? "./.env.test" : "./.env.dev";
//carga las variables de entorno desde el archivo especificado por path,estas variables se almacenan en process.env
config({ path })
//creo un objeto con acceso a esas variables 
const environment = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    SECRET_COOKIE: process.env.SECRET_COOKIE,
    SECRET_SESSION: process.env.SECRET_SESSION,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    SECRET_JWT: process.env.SECRET_JWT,
    GOOGLE_EMAIL: process.env.GOOGLE_EMAIL,
    GOOGLE_PASSWORD: process.env.GOOGLE_PASSWORD,
    STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
    STRIPE_SECRET: process.env.STRIPE_SECRET

}

export default environment;