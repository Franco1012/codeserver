import { Schema, model } from "mongoose"; //importamos el constructor de esquemas(la forma del dato) y el método model para generar un modelo
import mongoosePaginate from "mongoose-paginate-v2";
const colecction = "products"

const productSchema = new Schema({
    //por defecto los campos no son obligatorios
    title: { type: String, required: true, unique: true, index: true },
    photo: { type: String, default: "img.jpg" },
    category: { type: String, default: "uncategorized", enum: ["uncategorized", "calzado", "ropa", "accesorio"], index: true },
    price: { type: Number, default: 1 },
    stock: { type: Number, default: 1 }
}, {
    timestamps: true
}
)

productSchema.plugin(mongoosePaginate);

const Product = model(colecction, productSchema);
export default Product;