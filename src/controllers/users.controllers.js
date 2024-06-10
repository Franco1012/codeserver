import { createService, readService, readOneService, updateService, destroyService } from "../services/users.service.js";

class UsersControllers {
    async read(req, res, next) {
        try {

            const { role } = req.query
            let users
            let filter
            if (filter) {
                filter = { role }
                users = await readService(filter);
            } else {
                filter = {}
                users = await readService(filter);
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


    async readOne(req, res, next) {
        try {
            const { uid } = req.params

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
            console.log(req.body)
            const data = req.body
            const user = await createService(data)
            return res.json({
                statusCode: 201,
                message: "USER CREATED: " + user.id,

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