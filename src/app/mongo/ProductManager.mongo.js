import Product from "./models/product.model.js";
import Manager from "./Manager.mongo.js";

const gestorDeProductos = new Manager(Product)

export default gestorDeProductos;