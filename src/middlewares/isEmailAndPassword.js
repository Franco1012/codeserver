function isEmailAndPassword(req, res, next) {
    try {
        const {email,password} = req.body
        if (!email || !password) {

            const err = new Error("INSERT EMAIL AND PASSWORD")
            err.statusCode = 404
            throw err

        }
        next()
    } catch (error) {
        next(error)
    }


}
export default isEmailAndPassword