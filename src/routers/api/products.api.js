import { Router } from "express"
//import gestorDeProductos from "../../app/fs/ProductManager.js"
import gestorDeProductos from "../../app/mongo/ProductManager.mongo.js"
import isTitle from "../../middlewares/isTitle.js"
import uploader from "../../middlewares/multer.js"
import isPhoto from "../../middlewares/isPhoto.js"
const productsRouter = Router()


productsRouter.get("/", read)
productsRouter.get("/:pid", readOne)
productsRouter.post("/", uploader.single("photo"), isTitle, isPhoto, create)
productsRouter.put("/:pid", update)
productsRouter.delete("/:pid", destroy)

async function read(req, res, next) {
    try {
        const { category } = req.query
        const products = await gestorDeProductos.read({ category });
        if (products) {
            return res.json({
                statusCode: 200,
                response: products,

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
        const { pid } = req.params

        const product = await gestorDeProductos.readOne(pid)

        if (product) {

            return res.json({
                statusCode: 200,
                response: product,

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
        const data = req.body
        const product = await gestorDeProductos.create(data)
        return res.json({
            statusCode: 201,
            message: "PRODUCT CREATED: " + product.id,

        })

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

        return res.json({
            statusCode: 200,
            message: "UPDATE ID: " + product.id,

        })
    } catch (error) {
        console.log(error)
        return next(error)
    }
}
async function destroy(req, res, next) {
    try {
        const { pid } = req.params
        const product = await gestorDeProductos.destroy(pid)
        return res.json({
            statusCode: 200,
            message: "DELETE ID: " + product.id,

        })
    } catch (error) {
        console.log(error)
        return next(error)
    }

}


export default productsRouter