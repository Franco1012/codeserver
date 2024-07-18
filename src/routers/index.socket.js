/*import gestorDeProductos from "../app/fs/ProductManager.js"
import { socketServer } from "../../server.js"

export default async (socket) => {
    console.log("client id: ", socket.id)
    socket.emit("products", await gestorDeProductos.read())
    socket.on("add", async (data) => {
        console.log(data)
        await gestorDeProductos.create(data)
        socketServer.emit("products", await gestorDeProductos.read())
    })
}*/