import User from "./models/user.model.js";
import Manager from "./Manager.mongo.js";

const gestorDeUsuarios = new Manager(User)

export default gestorDeUsuarios;