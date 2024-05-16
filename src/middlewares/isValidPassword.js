import gestorDeUsuarios from "../app/mongo/UserManager.mongo.js";
async function isValidPassword(req, res, next) {
    try {
        const { email, password } = req.body;
        const user = await gestorDeUsuarios.readByEmail(email);

        if (user.password === password) {
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