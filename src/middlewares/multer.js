import multer from "multer"
import __dirname from "../../utils"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + "/../img")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({storage})
export default upload
