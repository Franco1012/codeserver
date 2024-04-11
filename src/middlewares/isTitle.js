function isTitle(req, res, next) {
    try {
        const title = req.body.title
        if (!title) {

            const err = new Error("INSERT TITLE")
            err.statusCode = 404
            throw err

        }
        next()
    } catch (error) {
        next(error)
    }


}
export default isTitle