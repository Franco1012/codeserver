import express from "express";
import gestorDeProductos from "./app/fs/ProductManager.js";
import gestorDeUsuarios from "./app/fs/UserManager.js";

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

//configuración de router para ProductManager

// Ruta para crear un nuevo producto

server.get("/api/products/create/:title?/:photo?/:category?/:price?/:stock?", async (req, resp) => {

    try {

        const { title, photo, category, price, stock } = req.params
        const data = { title, photo, category, price, stock }
        console.log(data)
        const product = await gestorDeProductos.create(data)
        if (product) {
            return resp.status(201).json({
                respuesta: product,
                succes: true

            })
        } else {
            const error = new Error("BAD REQUEST")
            error.statusCode = 400;
            throw error
        }


    } catch (error) {
        console.log(error)
        return resp.status(error.statusCode).json({
            respuesta: error.message,
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
server.get("/api/products/delete/:pid", async (req, res) => {

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


//configuración de router para UserManager
// Ruta para crear un nuevo usuario

server.get("/api/users/create/:photo?/:email?/:password?", async (req, resp) => {

    try {

        const { photo, email, password } = req.params
        const data = { photo, email, password, role }
        console.log(data)
        const user = await gestorDeUsuarios.create(data)
        if (user) {
            return resp.status(201).json({
                respuesta: user,
                succes: true

            })
        } else {
            const error = new Error("BAD REQUEST")
            error.statusCode = 400;
            throw error
        }


    } catch (error) {
        console.log(error)
        return resp.status(error.statusCode).json({
            respuesta: error.message,
            succes: false
        })
    }
})

// Ruta para obtener usuarios filtrados por categoría
server.get("/api/users", async (req, res) => {
    try {
        const { role } = req.query
        const users = await gestorDeUsuarios.read(role);
        if (users) {
            return res.status(200).json({
                response: users,
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

// Ruta para obtener un usuario por su ID
server.get("/api/users/:uid", async (req, res) => {
    try {
        const { uid } = req.params
        const id = uid

        const user = await gestorDeUsuarios.readOne(id)


        if (user) {

            return res.status(200).json({
                response: user,
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


// Ruta para eliminar un usuario por su ID
server.get("/api/users/delete/:uid", async (req, res) => {

    try {
        const { uid } = req.params
        const id = uid
        const user = await gestorDeUsuarios.destroy(id)

        if (user) {
            return res.status(200).json({
                response: user,
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
