async function isOnline() {
    try {

        //no es necesario porque el token ahora está en una cookie y viaja automaticamente en el objeto requerimiento
        /*const opts = {
            headers: { token: localStorage.getItem("token") }
        }*/

        let response = await fetch("/api/sessions/online");
        const usuarioOnline = await response.json();
        console.log(usuarioOnline)
        return usuarioOnline;
    } catch (error) {
        console.error("Error al obtener la información del usuario:", error);
        return false;
    }
}

async function updateNavbar() {

    const online = await isOnline();
    if (online.statusCode === 200) {
        document.getElementById("sessionNav").style.display = "block";
        document.getElementById("loginNav").style.display = "none";
        document.getElementById("register").style.display = "none";
        document.getElementById("profile").style.display = "block";
        // Mostrar o esconder elementos según el rol del usuario
        if (online.response.userRole === 1) {
            // Si el rol es 1, ocultar el carrito
            document.getElementById("cart").style.display = "none";
        } else {
            // Si el rol es diferente a 1, mostrar el carrito
            document.getElementById("cart").style.display = "block";
        }
        if (online.response.userRole === 0) {
            // Si el rol es 0, ocultar crear product
            document.getElementById("create_product").style.display = "none";
        } else {
            // Si el rol es diferente a 0, mostrar crear product
            document.getElementById("create_product").style.display = "block";
        }

        // Mostrar el link "My Products" solo si el rol es 2
        if (online.response.userRole === 2) {
            document.getElementById("my_product").style.display = "block";
        } else {
            document.getElementById("my_product").style.display = "none";
        }


    } else {
        document.getElementById("cart").style.display = "none";
        document.getElementById("sessionNav").style.display = "none";
        document.getElementById("profile").style.display = "none"
        document.getElementById("my_product").style.display = "none"
        document.getElementById("create_product").style.display = "none";

    }
    document.getElementById("navbar").style.display = "block"

}
document.addEventListener("DOMContentLoaded", function () {

    updateNavbar(); // Llama a la función updateNavbar() cuando se carga el DOM
});