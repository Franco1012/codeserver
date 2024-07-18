import { createService, readService, readOneService, updateService, destroyService } from "../services/users.service.js";
//controlador llama a servicio

class UsersControllers {
    async read(req, res, next) {
        try {

            const { role } = req.query
            let filter = {}
            let users


            if (role !== undefined && role !== null && role !== '') {
                filter = { role }
                users = await readService(filter);
            } else {
                users = await readService(filter);
            }

            if (users.length > 0) {
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


    async readOne(req, res, next) {
        try {
           const uid=req.user._id
            const user = await readOneService(uid)
            
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

    async create(req, res, next) {
        try {
            const data = req.body
            const user = await createService(data)
            return res.json({
                statusCode: 201,
                message: "USER CREATED: " + user._id,

            })

        } catch (error) {
            console.log(error)
            return next(error)
        }
    }

    async update(req, res, next) {
        try {
            const { uid } = req.params
            const data = req.body
            const user = await updateService(uid, data)

            return res.json({
                statusCode: 200,
                message: "UPDATE ID: " + user.id,

            })
        } catch (error) {
            console.log(error)
            return next(error)
        }
    }
    async destroy(req, res, next) {
        try {
            const { uid } = req.params
            const user = await destroyService(uid)
            return res.json({
                statusCode: 200,
                message: "DELETE ID: " + user.id,

            })
        } catch (error) {
            console.log(error)
            return next(error)
        }

    }
}
const usersControllers = new UsersControllers()
const { read, readOne, create, update, destroy } = usersControllers

export { read, readOne, create, update, destroy }