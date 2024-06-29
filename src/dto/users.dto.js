import argsUtil from "../utils/args.util.js";
import crypto from "crypto"
import { createHash } from "../utils/hash.util.js";
const persistence = argsUtil.persistence
//transfrmamos el objeto para que en las 3 persistencia tengan las mismas propiedades
class UsersDTO {
    constructor(data) {
        persistence !== "mongo" && (this._id = crypto.randomBytes(12).toString("hex"))//si no esta en la persistenca mongo voy a crearle a este objeto la propieda _id
        this.email = data.email;
        //verificar si corresponde o no evaluar el hasheo de la contraseña
        //porque el enrutador de sessions(/api/sessions/register)está usando passport
        //pero acá estoy usando el CRUD de users (/api/users)
        this.password = createHash(data.password);
        this.role = data.role || 0;
        this.photo = data.photo || "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/640px-User_icon_2.svg.png";
        this.verify = data.verify || false;
        this.verifyCode = crypto.randomBytes(12).toString("hex");
        (persistence !== "mongo") && (this.createAt = new Date());
        (persistence !== "mongo") && (this.updatedAt = new Date());

    }
}

export default UsersDTO;