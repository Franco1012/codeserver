import gestorDeUsuarios from "../app/mongo/UserManager.mongo.js";

async function isValidEmail(req, res, next) {
    try {
        const { email } = req.body;
        const user = await gestorDeUsuarios.readByEmail(email);
        if (user) {
            const error = new Error("Bad auth from register!")
            error.statusCode = 401;
            throw error;

        }
        return next()

    } catch (error) {
        return next(error)
    }



}
export default isValidEmail