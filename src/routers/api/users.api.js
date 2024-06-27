//import { Router } from "express"
//import gestorDeUsuarios from "../../app/fs/UserManager.js"
import CustomRouter from "../CustomRouter.js"
import uploader from "../../middlewares/multer.js"
import isPhoto from "../../middlewares/isPhoto.js"
import { read, readOne, create, update, destroy } from "../../controllers/users.controllers.js"
//enrutador llama a controlador

class UsersRouter extends CustomRouter {
    init() {
        this.read("/", ["PUBLIC"], read)
        this.read("/:uid", ["USER"], readOne)
        this.create("/", ["PUBLIC"], uploader.single("photo"), isPhoto, create)
        this.update("/:uid", ["ADMIN"], update)
        this.destroy("/:uid", ["ADMIN"], destroy)
    }
}




const usersRouter = new UsersRouter()
export default usersRouter.getRouter()
