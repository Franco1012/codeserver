//import { Router } from "express";
import CustomRouter from "./CustomRouter.js"
import passport from "../../middlewares/passport.js";
import passportCb from "../../middlewares/passportCb.js";

class SessionRouter extends CustomRouter {
    init() {
        this.create("/register",
            ["PUBLIC"],
            //isValidData,
            //isValidEmail,
            // createHashPassword,
            //passport.authenticate("register", { session: false }),
            passportCb("register"),
            async (req, res, next) => {
                try {

                    return res.json({
                        statusCode: 201,
                        message: "Registered!"
                    })
                } catch (error) {
                    return next(error)
                }
            })

        this.create("/login",
            ["PUBLIC"],
            //isValidUser,
            //isValidPassword,
            //passport.authenticate("login", { session: false }),
            passportCb("login"),
            async (req, res, next) => {
                try {


                    return res.cookie("token", req.user.token, { signedCookie: true }).json({
                        statusCode: 200,
                        message: "logged in!",
                        //token: req.user.token
                    });



                } catch (error) {
                    return next(error);
                }
            });


        this.read("/online",
            ["USER", "ADMIN"],
            //passport.authenticate("jwt", { session: false }),
            passportCb("jwt"),
            async (req, res, next) => {

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
            })

        this.create("/signout", ["USER", "ADMIN"], (req, res, next) => {
            try {
                //req.session.destroy()
                res.clearCookie('token').json({
                    statusCode: 200,
                    message: "signed out!"
                });
            } catch (error) {
                return next(error)
            }
        })

        this.read("/google", ["PUBLIC"], passport.authenticate("google", { scope: ["email", "profile"] }))
        this.read("/google/callback", ["PUBLIC"], passport.authenticate("google", { session: false, failureRedirect: "/" }), (req, res, next) => {
            try {
                //res.json({ statusCode: 200, message: "Logged in with google!" });
                return res.redirect("/?success=true")

            } catch (error) {
                return next(error)
            }
        })
    }
}
const sessionsRouter = new SessionRouter();
export default sessionsRouter.getRouter();



