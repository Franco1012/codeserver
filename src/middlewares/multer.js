import multer from "multer"
import __dirname from "../../utils.js"
//configuramos el almacenamiento
const storage = multer.diskStorage({
    //donde se van a guardar
    destination: (req, file, cb) => {
        cb(null, __dirname + "/public/img")
    },
    //con que nombre se van a guardar
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
//inicializamos multer pasandole el objeto que contiene las configuraciones de almacenamiento
const uploader = multer({storage})
export default uploader
