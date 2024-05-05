import { Router } from "express"
//import gestorDeUsuarios from "../../app/fs/UserManager.js"
import gestorDeUsuarios from "../../app/mongo/UserManager.mongo.js"
import isEmailAndPassword from "../../middlewares/isEmailAndPassword.js"
import uploader from "../../middlewares/multer.js"
import isPhoto from "../../middlewares/isPhoto.js"

const usersRouter = Router()

usersRouter.get("/", read)
usersRouter.get("/:uid", readOne)
usersRouter.post("/", uploader.single("photo"), isEmailAndPassword, isPhoto, create)
usersRouter.put("/:uid", update)
usersRouter.delete("/:uid", destroy)

async function read(req, res, next) {
    try {

        const { role } = req.query
        let users;
        if (users) {
            users = await gestorDeUsuarios.read({ filter: { role } });
        } else {
            users = await gestorDeUsuarios.read({ filter: {} });
        }


        if (users) {
            return res.json({
                statusCode: 200,
                response: users,

            })
        } else {
            const error = new Error("NOT FOUND")
            error.statusCode = 404
            throw error
        }


    } catch (error) {

        return next(error)
    }
}


async function readOne(req, res, next) {
    try {
        const { uid } = req.params

        const user = await gestorDeUsuarios.readOne(uid)

        if (user) {

            return res.json({
                statusCode: 200,
                response: user,

            })


        } else {
            const error = new Error("NOT FOUND")
            error.statusCode = 404
            throw error
        }
    } catch (error) {

        return next(error)
    }

}

async function create(req, res, next) {
    try {
        console.log(req.body)
        const data = req.body
        const user = await gestorDeUsuarios.create(data)
        return res.json({
            statusCode: 201,
            message: "USER CREATED: " + user.id,

        })

    } catch (error) {
        console.log(error)
        return next(error)
    }
}

async function update(req, res, next) {
    try {
        const { uid } = req.params
        const data = req.body
        const user = await gestorDeUsuarios.update(uid, data)

        return res.json({
            statusCode: 200,
            message: "UPDATE ID: " + user.id,

        })
    } catch (error) {
        console.log(error)
        return next(error)
    }
}
async function destroy(req, res, next) {
    try {
        const { uid } = req.params
        const user = await gestorDeUsuarios.destroy(uid)
        return res.json({
            statusCode: 200,
            message: "DELETE ID: " + user.id,

        })
    } catch (error) {
        console.log(error)
        return next(error)
    }

}


export default usersRouter