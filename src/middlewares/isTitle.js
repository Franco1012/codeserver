function isTitle(req, res, next) {
    try {
        const title = req.body.title
        if (!title) {

            const err = new Error("Insert Title")
            err.statusCode = 404
            throw err

        }
        return next()
    } catch (error) {
        next(error)
    }


}
export default isTitle