import { Schema, model } from "mongoose"; //importamos el constructor de esquemas(la forma del dato) y el método model para generar un modelo

const colecction = "users"

const userSchema = new Schema({
    //por defecto los campos no son obligatorios
    photo: { type: String, default: "img.jpg" },
    email: { type: String, require: true, unique: true,index:true },
    password: { type: String, require: true, unique: true },
    rol: { type: Number, default: 0,index:true }
}, {
    timestamps: true
}
)

const User = model(colecction, userSchema);
export default User;