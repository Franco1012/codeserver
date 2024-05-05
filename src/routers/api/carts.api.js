import { Router } from "express";
import gestorDeCarritos from "../../app/mongo/CartManager.mongo.js";
const cartsRouter = Router()

cartsRouter.post("/", create)
cartsRouter.get("/", read)


async function create(req, res, next) {
    try {
        const data = req.body;
        const cart = await gestorDeCarritos.create(data)
        return res.json({
            statusCode: 201,
            message: "CART CREATED: " + cart.id,
        })

    } catch (error) {
        return next(error)
    }
}


async function read(req, res, next) {
    try {
        const { user_id } = req.query
        console.log(user_id)
        if (user_id) {
            const carts = await gestorDeCarritos.read({filter:{ user_id }})
            if (carts.length > 0) {
                return res.json({
                    statusCode: 200,
                    response: carts,

                })
            }

        }
        const error = new Error("NOT FOUND");
        error.statusCode = 404;
        throw error;

    } catch (error) {
        return next(error)

    }


}

export default cartsRouter;