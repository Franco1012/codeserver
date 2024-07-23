
//import { Router } from "express";
import CustomRouter from "../CustomRouter.js"
import passport from "../../middlewares/passport.js";
import passportCb from "../../middlewares/passportCb.js";
import { register, login, signout, profile, google, verifyCode, resetPassword, updatePassword } from "../../controllers/sessions.controllers.js"
import validate from "../../middlewares/join.js";
import userSchema from "../../schemas/user.schema.js";

class SessionRouter extends CustomRouter {
    init() {
        this.create("/register",
            ["PUBLIC"],
            validate(userSchema),
            //isValidData,
            //isValidEmail,
            // createHashPassword,
            //passport.authenticate("register", { session: false }),
            passportCb("register"),
            register)
        this.create("/verify", ["PUBLIC"], verifyCode)
        this.create("/login",
            ["PUBLIC"],
            //isValidUser,
            //isValidPassword,
            //passport.authenticate("login", { session: false }),
            passportCb("login"),
            login);

        this.create("/password", ["PUBLIC"], resetPassword)
        this.update("/password", ["PUBLIC"], updatePassword)
        this.read("/online",
            ["USER", "ADMIN"],
            //passport.authenticate("jwt", { session: false }),
            //passportCb("jwt"),//probar de sacar autenticación de jwt con passport y dejar solo jwt en policies
            profile)

        this.create("/signout", ["USER", "ADMIN"], signout)

        this.read("/google", ["PUBLIC"], passport.authenticate("google", { scope: ["email", "profile"] }))
        this.read("/google/callback", ["PUBLIC"], passport.authenticate("google", { session: false, failureRedirect: "/" }), google)
    }
}
const sessionsRouter = new SessionRouter();
export default sessionsRouter.getRouter();




