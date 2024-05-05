import { Router } from "express";
//import gestorDeUsuarios from "../../app/fs/UserManager.js";
import gestorDeUsuarios from "../../app/mongo/UserManager.mongo.js";

const viewUsers = Router()

viewUsers.get("/register",async (req, res, next) => {
    try {
        return res.render("userRegister")
    } catch (error) {
        console.log(error)
        return next(error)
    }
})

viewUsers.get("/:uid", async (req, res, next) => {
    try {
        const { uid } = req.params
        const user = await gestorDeUsuarios.readOne(uid)
        return res.render("userDate", { user })
    } catch (error) {
        console.log(error)
        return next(error)
    }

})


export default viewUsers;