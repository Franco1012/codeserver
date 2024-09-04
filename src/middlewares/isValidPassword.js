import gestorDeUsuarios from "../app/mongo/UserManager.mongo.js";
import { veryfyHash } from "../utils/hash.util.js";

async function isValidPassword(req, res, next) {
    try {
        const { email, password } = req.body;
        const user = await gestorDeUsuarios.readByEmail(email);
        const verify = veryfyHash(password, user.password)

        if (verify) {
            return next()
        }
        const error = new Error("Invalid credentials")
        error.statusCode = 401;
        throw error;
    } catch (error) {
        return next(error)
    }
}

export default isValidPassword;