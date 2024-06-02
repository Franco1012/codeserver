import { Router } from "express";
import gestorDeCarritos from "../../app/mongo/CartManager.mongo.js";
const cartsRouter = Router()

cartsRouter.post("/", create)
cartsRouter.get("/", read)
cartsRouter.get("/:cid", readOne);
cartsRouter.put("/:cid", update);

cartsRouter.delete("/:cid", destroy)


async function create(req, res, next) {
    try {
        const data = req.body;
        console.log(data)
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
            const carts = await gestorDeCarritos.read({ filter: { user_id } })

            console.log("soy el carrito", carts)

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

async function readOne(req, res, next) {
    try {
        const { cid } = req.params;
        const productCart = await gestorDeCarritos.readOne(cid);
        if (one) {
            return res.json({
                statusCode: 200,
                response: productCart,
            });
        } else {
            const error = new Error("Not found!");
            error.statusCode = 404;
            throw error;
        }
    } catch (error) {
        return next(error);
    }
}
async function update(req, res, next) {
    try {
        const { cid } = req.params;
        const data = req.body;
        const productCart = await cartsManager.update(cid, data);
        return res.json({
            statusCode: 200,
            response: productCart,
        });
    } catch (error) {
        return next(error);
    }
}

async function destroy(req, res, next) {
    try {
        const { cid } = req.params
        const productCart = await gestorDeCarritos.destroy(cid)
        return res.json({
            statusCode: 200,
            response: productCart

        })
    } catch (error) {
        console.log(error)
        return next(error)
    }

}

export default cartsRouter;