import { Router } from "express";
import gestorDeUsuarios from "../../app/mongo/UserManager.mongo.js";
import isValidEmail from "../../middlewares/isValidEmail.js";
import isValidData from "../../middlewares/isValidData.js";
import isValidPassword from "../../middlewares/isValidPassword.js";
import isValidUser from "../../middlewares/isValidUser.js";
const sessionsRouter = Router();

sessionsRouter.post("/register", isValidData, isValidEmail, async (req, res, next) => {
    try {
        const data = req.body
        await gestorDeUsuarios.create(data);
        return res.json({
            statusCode: 201,
            message: "Registered!"
        })
    } catch (error) {
        return next(error)
    }
})

sessionsRouter.post("/login", isValidUser, isValidPassword, async (req, res, next) => {
    try {
        const { email } = req.body;
        console.log(email)
        const user = await gestorDeUsuarios.readByEmail(email);
        //console.log(user._id)

        req.session.email = email
        req.session.role = user.role
        req.session.online = true
        req.session.userId = user._id
        req.session.photo = user.photo

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
export default sessionsRouter;



