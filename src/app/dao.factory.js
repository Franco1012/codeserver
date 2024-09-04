import argsUtil from "../utils/args.util.js";
import dbConnect from "../utils/dbConnect.js"

const persistence = argsUtil.persistence
//objeto que voy a cargar dinamicamente con las importaciones de los manager que correspondan
let dao = {}

//evaluamos la variable persistence con swicht
switch (persistence) {
    case "memory":
        console.log("connected to memory")
        //llenar dao con las importaciones de memory
        const { default: gestorDeUsuariosMem } = await import("./memory/UsersManager.js")//importar dinamicamente
        const { default: gestorDeProductosMem } = await import("./memory/ProductsManager.js")
        const { default: gestorDeCarritosMem } = await import("./memory/CartsManager.js")

        //se tienen que traer todos los manager de todos los recursos y ya tienen que estar homologados
        //una vez que están importados los managers,lleno el objeto dao con los recursos correspondientes
        //dao={users:gestorDeUsuariosMem,products:gestorDeProductosMem,carts:gestorDeCarritosMem}
        dao = {
            usersManager: gestorDeUsuariosMem,
            productsManager: gestorDeProductosMem,
            cartsManager: gestorDeCarritosMem
        }
        break;

    case "fs":
        console.log("connected to file system")
        //llenar dao con las importaciones de fs
        const { default: gestorDeUsuariosFs } = await import("./fs/UsersManager.js")
        const { default: gestorDeProductosFs } = await import("./fs/ProductsManager.js")
        const { default: gestorDeCarritosFs } = await import("./fs/CartsManager.js")
        dao = {
            usersManager: gestorDeUsuariosFs,
            productsManager: gestorDeProductosFs,
            cartsManager: gestorDeCarritosFs
        }
        break;
    default:

        console.log("connected to database")
        dbConnect()

        //por defecto manejamos mongo
        //llenar dao con las importaciones de mongo
        const { default: gestorDeUsuariosMongo } = await import("./mongo/UsersManager.mongo.js")
        const { default: gestorDeProductosMongo } = await import("./mongo/ProductsManager.mongo.js")
        const { default: gestorDeCarritosMongo } = await import("./mongo/CartsManager.mongo.js")
        dao = {
            usersManager: gestorDeUsuariosMongo,
            productsManager: gestorDeProductosMongo,
            cartsManager: gestorDeCarritosMongo
        }
        break;
}
export default dao