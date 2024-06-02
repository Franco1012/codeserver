import passport from "passport"
//es una función que depende de la estrategia a implementar y que devuelve:
//el error si ocurre
//los datos del usuario si existen
//la informacion correspondiente en caso de que no suceda lo anterior
//es una función que devuelve un middleware

function passportCb(strategy) {
    //devuelve un middleware
    return (req,res,next) => {
        passport.authenticate(strategy, (error, user, info) => {
            if (error) {
                return next(error)
            }
            if (user) {
                req.user = user
                return next()
            }
            return res.json({
                statusCode: info.statusCode || 401,
                message: info.message ? info.message : info.toString

            })
        })(req, res, next);
    }
}

export default passportCb