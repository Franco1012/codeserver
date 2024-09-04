export async function vaciarCarrito() {
    try {
        const opts = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        };
        const response = await fetch("/api/carts/all", opts);

        // Verifica si la URL actual contiene "cart" o la ruta específica de la página de carritos
        if (window.location.pathname.includes("cart")) {
            location.reload(); // Recarga la página solo si se encuentra en la página de carritos
        }
    } catch (error) {
        console.log(error);
    }
}
