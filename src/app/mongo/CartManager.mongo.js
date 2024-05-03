import Cart from "./models/cart.model.js";
import Manager from "./Manager.mongo.js";

const gestorDeCarritos = new Manager(Cart)
export default gestorDeCarritos;