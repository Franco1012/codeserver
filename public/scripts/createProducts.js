// Obtener el id del producto de la url
const queries = new URL(location.href);
const pid = queries.searchParams.get("id");


// Función para crear un nuevo producto
document.querySelector("#createProduct").addEventListener("click", async () => {
    try {

        // Definir el objeto 'data' dentro de la función para obtener los valores actuales
        const data = {
            title: document.querySelector("#title").value,
            photo: document.querySelector("#photo").value || undefined,
            category: document.querySelector("#category").value || undefined,
            price: document.querySelector("#price").value || undefined,
            stock: document.querySelector("#stock").value || undefined,
        };

        const opts = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };

        let response = await fetch("/api/products", opts);
        response = await response.json();
        console.log(response);

        return alert(response.message);
    } catch (error) {
        console.log(error);
    }
});

// Función para actualizar un producto existente
document.querySelector("#updateProduct").addEventListener("click", async () => {
    try {
        if (pid) {
            // Definir el objeto 'data' dentro de la función para obtener los valores actuales
            const data = {
                title: document.querySelector("#title").value,
                photo: document.querySelector("#photo").value || undefined,
                category: document.querySelector("#category").value || undefined,
                price: document.querySelector("#price").value || undefined,
                stock: document.querySelector("#stock").value || undefined,
            };

            const opts = {
                method: "PUT", // El método debe ser PUT para actualizar
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            };

            let response = await fetch(`/api/products/${pid}`, opts);
            response = await response.json();
            console.log(response);
            if (response.statusCode === 200) {
                return alert("Product Update")
            }
        }
        return alert("Select Product to Update")

    } catch (error) {
        console.log(error);
    }
})
