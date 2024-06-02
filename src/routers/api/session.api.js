import { Router } from "express";
import gestorDeUsuarios from "../../app/mongo/UserManager.mongo.js";
//import isValidEmail from "../../middlewares/isValidEmail.js";
//import isValidData from "../../middlewares/isValidData.js";
import isValidPassword from "../../middlewares/isValidPassword.js";
import isValidUser from "../../middlewares/isValidUser.js";
//import createHashPassword from "../../middlewares/createHashPassword.js";
import passport from "../../middlewares/passport.js";
const sessionsRouter = Router();

sessionsRouter.post("/register",
    //isValidData,
    //isValidEmail,
    // createHashPassword,
    passport.authenticate("register", { session: false }),

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

sessionsRouter.post("/login",
    //isValidUser,
    //isValidPassword,
    passport.authenticate("login", { session: false }),
    async (req, res, next) => {
        try {


            return res.json({
                statusCode: 200,
                message: "logged in!"
            });



        } catch (error) {
            return next(error);
        }
    });


sessionsRouter.get("/online", (req, res, next) => {

    try {
        if (req.session.online)
            return res.json({
                statusCode: 200,
                message: "Is online",
                userId: req.session.userId
            });
        return res.json({
            statusCode: 401,
            message: "Bad auth!",
        })

    } catch (error) {
        return next(error)
    }
})

sessionsRouter.post("/signout", (req, res, next) => {
    try {
        req.session.destroy()
        return res.json({
            statusCode: 200,
            message: "signed out!"
        });
    } catch (error) {
        return next(error)
    }
})

sessionsRouter.get("/google", passport.authenticate("google", { scope: ["email", "profile"] }))
sessionsRouter.get("/google/callback", passport.authenticate("google", { session: false, failureRedirect: "/" }), (req, res, next) => {
    try {
        //res.json({ statusCode: 200, message: "Logged in with google!" });
        return res.redirect("/?success=true")

    } catch (error) {
        return next(error)
    }
})
export default sessionsRouter;



