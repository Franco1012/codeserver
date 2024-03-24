import express from "express";
import gestorDeProductos from "./app/fs/ProductManager.js";

//server
//se crea el servidor
const server = express();
const port = 8080;
const ready = () => console.log("server ready on port" + port)
//se inicia/levanta el servidor

server.listen(port, ready);
//middlewares
server.use(express.urlencoded({ extended: true }));//obligo al servidor a usar la función encargada de leer parámetros/consultas
//permite leer req.params y req.query

//router

// Ruta para crear un nuevo producto

server.get("/api/products/:title/:photo/:category/:price/:stock", async (req, resp) => {

    try {

        const { title, photo, category, price, stock } = req.params
        const data = { title, photo, category, price, stock }
        const product = await gestorDeProductos.create(data)
        console.log(product)
        return resp.status(201).json({
            respuesta: product,
            succes: true

        })

    } catch (error) {
        console.log(error)
        return resp.status(500).json({
            respuesta: "coder Api error",
            succes: false
        })
    }
})
// Ruta para obtener productos filtrados por categoría
server.get("/api/products", async (req, res) => {
    try {
        const { category } = req.query
        const products = await gestorDeProductos.read(category);
        if (products) {
            return res.status(200).json({
                response: products,
                succes: true
            })
        } else {
            const error = new Error("NOT FOUND")
            error.statusCode = 404
            throw error
        }


    } catch (error) {
        console.log(error)
        return res.status(error.statusCode).json({
            respuesta: error.message,
            succes: false
        })
    }
}
)

// Ruta para obtener un producto por su ID
server.get("/api/products/:pid", async (req, res) => {
    try {
        const { pid } = req.params
        const id = pid

        const product = await gestorDeProductos.readOne(id)

        if (product) {

            return res.status(200).json({
                response: product,
                succes: true
            })


        } else {
            const error = new Error("NOT FOUND")
            error.statusCode = 404
            throw error
        }
    } catch (error) {
        console.log(error)
        return res.status(error.statusCode).json({
            respuesta: error.message,
            succes: false
        })
    }

})

// Ruta para eliminar un producto por su ID
server.get("/api/products/eliminar/:pid", async (req, res) => {

    try {
        const { pid } = req.params
        const id = pid
        const product = await gestorDeProductos.destroy(id)

        if (product) {
            return res.status(200).json({
                response: product,
                succes: true
            })
        } else {
            const error = new Error("NOT FOUND")
            error.statusCode = 404
            throw error
        }

    } catch (error) {
        console.log(error)
        return res.status(error.statusCode).json({
            respuesta: error.message,
            succes: false
        })
    }
})
