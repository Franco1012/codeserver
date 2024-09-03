import { vaciarCarrito } from "./vaciarCarrito.js"
document.querySelector("#return").addEventListener("click", () => {
    try {
        vaciarCarrito()
        location.href = "/"
    } catch (error) {
        console.log(error)
    }
})