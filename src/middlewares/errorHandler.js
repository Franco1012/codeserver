function errorHandler(error, req, res, next) {
    //console.log("este es el error",error)
    return res.json({
        statusCode: error.statusCode || 500,
        message: error.message || "coder Api Error"
    })
}

export default errorHandler