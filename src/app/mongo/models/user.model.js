import { Schema, model } from "mongoose"; //importamos el constructor de esquemas(la forma del dato) y el método model para generar un modelo
import mongoosePaginate from "mongoose-paginate-v2"
const colecction = "users"

const userSchema = new Schema({
    //por defecto los campos no son obligatorios
    photo: { type: String, default: "img.jpg" },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true, unique: true },
    role: { type: Number, default: 0, index: true },
    verify: { type: Boolean, default: false },
    verifyCode: { type: String, required: true },
    resetToken: { type: String, default: null }, // Nueva propiedad resetToken

}, {
    timestamps: true
}
)
userSchema.plugin(mongoosePaginate);
const User = model(colecction, userSchema);
export default User;