import { updateService, readByEmailService } from "../services/users.service.js";

class SessionsController {
    async register(req, res, next) {
        try {

            return res.json({
                statusCode: 201,
                message: "Registered!"
            })
        } catch (error) {
            return next(error)
        }
    }

    async login(req, res, next) {
        try {
            return res.cookie("token", req.user.token, { signedCookie: true }).json({
                statusCode: 200,
                message: "logged in!",
                //token: req.user.token
            });

        } catch (error) {
            return next(error);
        }
    }
    async verifyCode(req, res, next) {
        try {
            const { email, code } = req.body
            //console.log(email)
            console.log(code)
            const one = await readByEmailService(email)
            console.log("one controllers",one)
            const verify = code === one.verifyCode//la comparacion devuelve un booleano 
            console.log(verify)
            if (verify) {
                const userUpdate=await updateService(one._id,{ verify })
                //console.log("userUpdate",userUpdate)
                return res.message200("Verified User!")
            } else {
                return res.error400("Invalid credentials")
            }
        } catch (error) {
            return next(error)
        }
    }

    async profile(req, res, next) {

        try {
            //if (req.session.online)
            if (req.user.online) {
                return res.json({
                    statusCode: 200,
                    message: "Is online",
                    userId: req.user._id,
                });
            }

            return res.json({
                statusCode: 401,
                message: "Bad auth!",
            })

        } catch (error) {
            return next(error)
        }
    }
    signout(req, res, next) {
        try {
            //req.session.destroy()
            res.clearCookie('token').json({
                statusCode: 200,
                message: "signed out!"
            });
        } catch (error) {
            return next(error)
        }
    }
    google(req, res, next) {
        try {
            //res.json({ statusCode: 200, message: "Logged in with google!" });
            return res.redirect("/?success=true")

        } catch (error) {
            return next(error)
        }
    }


}

const sessionsController = new SessionsController()
const { register, login, signout, profile, google,verifyCode } = sessionsController;
export { register, login, signout, profile, google,verifyCode }
