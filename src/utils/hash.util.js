import { genSaltSync, hashSync, compareSync } from "bcrypt";

//función para recibir una contraseña y retornar una contraseña hasheada

const createHash = (password) => {

    // Verificar si la contraseña ya está hasheada
    if (password.startsWith('$2b$') && password.length === 60) {
        return password; // Retorna la contraseña tal como está si ya está hasheada
    }

    const salt = genSaltSync(10);//nivel de seguridad
    const hash = hashSync(password, salt);//hashea la contraseña
    return hash; //retorna la contraseña hasheada
}

const veryfyHash = (reqBodyPass, mongoPass) => {
    console.log("req.body.pass", reqBodyPass)
    console.log("mongoPass", mongoPass)
    const verify = compareSync(reqBodyPass, mongoPass);
    return verify;
}

export { createHash, veryfyHash }