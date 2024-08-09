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



        if (req.query.limit) {
            opts.limit = req.query.limit
        }
        if (req.query.page) {
            opts.page = req.query.page
        }
        if (req.query.user_id) {
            filter.user_id = req.query.user_id
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
        const data = req.body
        const product = await createService(data)
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