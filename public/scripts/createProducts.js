// Obtener el id del producto de la url
const queries = new URL(location.href);
const pid = queries.searchParams.get("id");

// Seleccionar los botones
const createButton = document.querySelector("#createProduct");
const updateButton = document.querySelector("#updateProduct");

// Función para mostrar/ocultar botones según el valor de 'pid'
function toggleButtons() {
    if (pid) {
        createButton.style.display = "none";  // Oculta el botón de crear
        updateButton.style.display = "block"; // Muestra el botón de actualizar
        // Cargar los datos del producto en el formulario
        (async function loadProductData(pid) {
            try {
                let response = await fetch(`/api/products/${pid}`);
                let product = await response.json();
                console.log("product", product)
                // Rellenar los campos del formulario con los datos del producto
                document.querySelector("#title").value = product.response.title || '';
                document.querySelector("#photo").value = product.response.photo || '';
                document.querySelector("#category").value = product.response.category || '';
                document.querySelector("#price").value = product.response.price || '';
                document.querySelector("#stock").value = product.response.stock || '';
            } catch (error) {
                console.log("Error loading product data:", error);
            }
        })(pid); // Llamada inmediata a la función anónima con `pid`
    } else {
        createButton.style.display = "block"; // Muestra el botón de crear
        updateButton.style.display = "none";  // Oculta el botón de actualizar
    }
}

// Llamar a la función al cargar la página
toggleButtons();

function clearFormFields() {
    document.querySelector("#title").value = '';
    document.querySelector("#photo").value = '';
    document.querySelector("#category").value = '';
    document.querySelector("#price").value = '';
    document.querySelector("#stock").value = '';
}



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
        // Vaciar los campos del formulario después de crear el producto
        clearFormFields();
        //console.log(response)
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
                // Vaciar los campos del formulario después de crear el producto
                clearFormFields();
                return alert("Product Update")
            }
        }
        return alert("Select Product to Update")

    } catch (error) {
        console.log(error);
    }
})
