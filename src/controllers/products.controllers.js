import { createService, readService, readOneService, paginateService, updateService, destroyService } from "../services/products.service.js"
async function read(req, res, next) {
    try {

        const { category } = req.query
        let filter = {}
        let products

        if (category !== undefined && category !== null && category !== '') {
            filter = { category }
            products = await readService(filter);
        } else {
            products = await readService(filter);
        }

        if (products) {

            /*return res.json({
                statusCode: 200,
                response: products,

            })*/
            return res.response200(products)
        } else {
            return res.error404()
        }


    } catch (error) {
        return next(error)
    }
}

async function paginate(req, res, next) {
    try {

        const filter = {}
        const opts = { sort: "title" }
        // Verificar si el usuario está autenticado
        if (req.user) {
            const { role } = req.user; // Extraer el rol y el ID del usuario autenticado
            const userId = req.user._id; // ID del usuario que hace la solicitud

            // Verificación del rol del usuario
            if (role === 2) { // Si es usuario premium
                filter["product_id.supplier_id"] = { $ne: userId }; // Excluir productos del usuario
            }
        }

        if (req.query.limit) {
            opts.limit = req.query.limit
        }
        if (req.query.page) {
            opts.page = req.query.page
        }


        const products = await paginateService({ filter, opts })


        /*return res.json({
            statusCode: 200,
            response: products.docs,
            info: {}
        })*/
        const info = {
            totalDocs: products.totalDocs,
            page: products.page,
            totalPages: products.totalPages,
            limit: products.limit,
            prevPages: products.prevPage,
            nextPages: products.nextPage,
        }
        return res.paginate(products.docs, info)

    } catch (error) {
        next(error)
    }
}

async function readOne(req, res, next) {

    try {
        const { pid } = req.params

        const product = await readOneService(pid)

        if (product) {

            /*return res.json({
                statusCode: 200,
                response: product,

            })*/
            return res.response200(product)


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
        const userId = req.user._id
        console.log("userid", userId)
        const data = req.body
        const productData = {
            ...data, // Incluye todos los campos existentes del cuerpo de la solicitud
            supplier_id: userId // Añadir el ID del usuario al campo supplier_id
        }
        const product = await createService(productData)
        /*return res.json({
            statusCode: 201,
            message: "PRODUCT CREATED: " + product.id,

        })*/
        return res.response201("PRODUCT CREATED: " + product._id, product)

    } catch (error) {
        return next(error)
    }
}

async function update(req, res, next) {
    try {
        const { pid } = req.params
        const data = req.body
        const product = await updateService(pid, data)

        /*return res.json({
            statusCode: 200,
            message: "UPDATE ID: " + product.id,

        })*/
        return res.response200(product)
    } catch (error) {
        console.log(error)
        return next(error)
    }
}
async function destroy(req, res, next) {
    try {
        const { pid } = req.params
        const product = await destroyService(pid)
        /*return res.json({
            statusCode: 200,
            message: "DELETE ID: " + product.id,

        })*/
        return res.response200(product)
    } catch (error) {
        console.log(error)
        return next(error)
    }

}


export { create, read, readOne, paginate, update, destroy }