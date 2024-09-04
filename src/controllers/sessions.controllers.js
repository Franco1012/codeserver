import { updateService, readByEmailService } from "../services/users.service.js";
import { createToken, verifyToken } from "../utils/token.util.js";
import { createHash } from "../utils/hash.util.js";
import sendEmail from "../utils/mailing.util.js";
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
    async resetPassword(req, res, next) {
        try {
            const { email } = req.body

            const one = await readByEmailService(email)
            if (!one) {
                return res.error404()
            }
            // Generar un resetToken de restablecimiento de contraseña
            const resetToken = createToken({ email });
            // Actualizar el token de restablecimiento en el usuario
            await updateService(one._id, { resetToken });
            // Enviar correo electrónico de restablecimiento de contraseña
            await sendEmail({
                to: email,
                subject: "Password Reset Request",
                html: `
                    <h1>Reset Your Password</h1>
                    <p>Click the link below to reset your password:</p>
                    <a href="http://localhost:8080/pages/resetPassword.html?resetToken=${resetToken}">Reset Password</a>
                `
            });
            return res.message200("Reset password email sent");
        } catch (error) {
            return next(error)
        }
    }
    async updatePassword(req, res, next) {
        try {
            const { resetToken, newPassword } = req.body;
          
            // Verificar el resetToken
            const decoded = verifyToken(resetToken);
            if (!decoded) {
                return res.error400('Invalid or expired token')
            }

            const email = decoded.email;
            const user = await readByEmailService(email);
            if (!user) {
                return res.error404();
            }

            // Actualizar la contraseña del usuario
            const hashedPassword = createHash(newPassword);
            await updateService(user._id, { password: hashedPassword });
            return res.message200('Password successfully updated')
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
            console.log("one controllers", one)
            const verify = code === one.verifyCode//la comparacion devuelve un booleano 
            console.log(verify)
            if (verify) {
                const userUpdate = await updateService(one._id, { verify })
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
        //console.log("profile",req.user)
        try {
            const user = {
                userId: req.user._id,
                userRole: req.user.role
            }
            //if (req.session.online)
            if (req.user.online) {
                return res.response200(user)
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
const { register, login, signout, profile, google, verifyCode, resetPassword, updatePassword } = sessionsController;
export { register, login, signout, profile, google, verifyCode, resetPassword, updatePassword }
