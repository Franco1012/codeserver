import { genSaltSync, hashSync, compareSync } from "bcrypt";

//función para recibir una contraseña y retornar una contraseña hasheada

const createHash = (password) => {
    const salt = genSaltSync(10);//nivel de seguridad
    const hash = hashSync(password, salt);//hashea la contraseña
    return hash; //retorna la contraseña hasheada
}

const veryfyHash = (reqBodyPass, mongoPass) => {
    const verify = compareSync(reqBodyPass, mongoPass);
    return verify;
}

export { createHash, veryfyHash }