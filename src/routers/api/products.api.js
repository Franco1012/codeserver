//import { Router } from "express"
//import gestorDeProductos from "../../app/fs/ProductManager.js"
import CustomRouter from "./CustomRouter.js"
import gestorDeProductos from "../../app/mongo/ProductManager.mongo.js"
import isTitle from "../../middlewares/isTitle.js"
import uploader from "../../middlewares/multer.js"
import isPhoto from "../../middlewares/isPhoto.js"
import isValidAdmin from "../../middlewares/isValidAdmin.js"


class ProductsRouter extends CustomRouter {
    init() {
        this.read("/", ["PUBLIC"], read)
        this.read("/paginate", ["PUBLIC"], paginate) //ojo que los verbos no van en los endpoints, esto es una excepción a la regla
        this.read("/:pid", ["PUBLIC"], readOne)
        this.create("/", uploader.single("photo"), ["ADMIN"], isValidAdmin, isTitle, isPhoto, create)
        this.update("/:pid", ["ADMIN"], update)
        this.destroy("/:pid", ["ADMIN"], destroy)
    }
}


const productsRouter = new ProductsRouter()
export default productsRouter.getRouter();


async function read(req, res, next) {
    try {
        const { category } = req.query

        let products;
        if (category) {
            products = await gestorDeProductos.read({ filter: { category } });
        } else {
            products = await gestorDeProductos.read({ filter: {} });
        }


        if (products) {
            /*return res.json({
                statusCode: 200,
                response: products,

            })*/
            return res.response200(products)
        } else {
            const error = new Error("NOT FOUND")
            error.statusCode = 404
            throw error
        }


    } catch (error) {
        return next(error)
    }
}

async function paginate(req, res, next) {
    try {
        const filter = {}
        const opts = {
        }

        if (req.query.limit) {
            opts.limit = req.query.limit
        }
        if (req.query.page) {
            opts.page = req.query.page
        }
        if (req.query.user_id) {
            filter.user_id = req.query.user_id
        }
        const products = await gestorDeProductos.paginate({ filter, opts })


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

        const product = await gestorDeProductos.readOne(pid)

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
        const product = await gestorDeProductos.create(data)
        /*return res.json({
            statusCode: 201,
            message: "PRODUCT CREATED: " + product.id,

        })*/
        return res.message201("PRODUCT CREATED: " + product.id)

    } catch (error) {
        console.log(error)
        return next(error)
    }
}

async function update(req, res, next) {
    try {
        const { pid } = req.params
        const data = req.body
        const product = await gestorDeProductos.update(pid, data)

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
        const product = await gestorDeProductos.destroy(pid)
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


