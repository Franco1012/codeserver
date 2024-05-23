import gestorDeUsuarios from "../app/mongo/UserManager.mongo.js";
async function isValidData(req, res, next) {
    try {
        const { email, password } = req.body
        if (!email || !password) {

            const error = new Error("Please enter email and data")
            error.statusCode = 404
            throw error

        }
        return next()
    } catch (error) {
        return next(error)
    }
}

export default isValidData;