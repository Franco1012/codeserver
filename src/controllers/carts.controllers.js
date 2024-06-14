import { createService, readService, readOneService, updateService, destroyService } from "../services/carts.service.js"
async function create(req, res, next) {
    try {
        const data = req.body;

        data.user_id = req.user._id

        const cart = await createService(data)
        //console.log(cart)
        /*return res.json({
            statusCode: 201,
            message: "CART CREATED: " + cart.id,
        })*/
        return res.response201("CART CREATED: ", cart)

    } catch (error) {
        return next(error)
    }
}


async function read(req, res, next) {
    try {
        const user_id = req.user._id
        const filter = { user_id }
        const carts = await readService(filter)

        if (carts.length > 0) {
            /*return res.json({

                statusCode: 200,
                response: carts,

            })*/
            return res.response200(carts)
        }
        /*const error = new Error("NOT FOUND");
               error.statusCode = 404;
               throw error;*/
        return res.error404()
    }
    catch (error) {
        return next(error)

    }


}

async function readOne(req, res, next) {
    try {
        const { cid } = req.params;
        const productCart = await readOneService(cid);
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
        const productCart = await updateService(cid, data);
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
        const productCart = await destroyService(cid)
        return res.json({
            statusCode: 200,
            response: productCart

        })
    } catch (error) {
        console.log(error)
        return next(error)
    }

}

export { create, read, readOne, update, destroy }