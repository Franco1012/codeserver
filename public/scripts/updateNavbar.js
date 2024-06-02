async function isOnline() {
    try {
        //no es necesario porque el token ahora está en una cookie y viaja automaticamente en el objeto requerimiento
        /*const opts = {
            headers: { token: localStorage.getItem("token") }
        }*/
        let response = await fetch("/api/sessions/online");
        const usuarioOnline = await response.json();
        return usuarioOnline.statusCode === 200;
    } catch (error) {
        console.error("Error al obtener la información del usuario:", error);
        return false;
    }
}

async function updateNavbar() {

    const online = await isOnline();
    if (online) {
        document.getElementById("cart").style.display = "block";
        document.getElementById("sessionNav").style.display = "block";
        document.getElementById("loginNav").style.display = "none";
        document.getElementById("register").style.display = "none"
        document.getElementById("profile").style.display = "block"


    } else {
        document.getElementById("cart").style.display = "none";
        document.getElementById("sessionNav").style.display = "none";
        document.getElementById("profile").style.display = "none"

    }
    document.getElementById("navbar").style.display = "block"

}
document.addEventListener("DOMContentLoaded", function () {

    updateNavbar(); // Llama a la función updateNavbar() cuando se carga el DOM
});