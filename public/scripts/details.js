// Obtener el id del producto de la url
const queries = new URL(location.href);
const pid = queries.searchParams.get("id");
console.log(pid)
// Función para crear el template del producto
const template = (data, isAdmin, isPremium, userId) => `
  <div class="container d-flex flex-wrap justify-content-center">
    <div class="card" style="width: 18rem;">
      <img src="${data.photo}" class="card-img-top" alt="${data.title}" />
      <div class="card-body">
        <h5 class="card-title">${data.title}</h5>
        ${!isAdmin && !isPremium
        ? `<input type="button" value="Add Cart" class="btn btn-primary" onclick="addToCartButton('${data._id}')">`
        : ''
    }
        ${isAdmin
        ? `<a href="/pages/createProduct.html?id=${data._id}" class="btn btn-primary">Update</a>
               <input type="button" value="Delete Product" class="btn btn-danger" onclick="deleteProduct('${data._id}')">`
        : ''
    }
        ${isPremium && !isAdmin && data.supplier_id === userId
        ? `<a href="/pages/createProduct.html?id=${data._id}" class="btn btn-primary">Update</a>
               <input type="button" value="Delete Product" class="btn btn-danger" onclick="deleteProduct('${data._id}')">`
        : ''
    }
      ${isPremium && !isAdmin && data.supplier_id !== userId
        ? `<input type="button" value="Add Cart" class="btn btn-primary" onclick="addToCartButton('${data._id}')">`
        : ''
    }
      </div>
    </div>
  </div>`;

// Obtener los detalles del producto y el rol del usuario
async function loadProduct(pid) {
    try {
        const sessionRes = await fetch("/api/sessions/online");
        const sessionData = await sessionRes.json();
        const userId = sessionData.response?.userId;
        const userRole = sessionData.response?.userRole;
        const isAdmin = userRole === 1; // Administrador
        const isPremium = userRole === 2; // Usuario Premium

        const productRes = await fetch("/api/products/" + pid);
        const productData = await productRes.json();
        const product = productData.response;

        const productHtml = template(product, isAdmin, isPremium, userId);
        document.querySelector("#product").innerHTML = productHtml;

    } catch (err) {
        console.error(err);
    }
}

async function addToCartButton(pid) {
    try {
        const data = {
            product_id: pid,
            quantity: 1
        };

        const opts = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        };

        let response = await fetch("/api/carts", opts);
        response = await response.json();
        console.log(response);
        if(response.statusCode===201){
            return await Swal.fire({
                title: "¡Producto agregado!",
                text: response.message,
                icon: "success",
                timer: 3000, // Tiempo en milisegundos (2000 ms = 2 segundos)
                timerProgressBar: true
            });
        
        }
    } catch (error) {
        console.error(error);
    }
}

async function deleteProduct(pid) {
    try {
        const opts = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        };

        let response = await fetch(`/api/products/${pid}`, opts);
        response = await response.json();
        console.log(response);
        if (response.statusCode === 200) {
            alert("Product deleted successfully");
            location.replace("/");
        }
    } catch (error) {
        console.log(error);
    }
}





// Cargar el producto al iniciar la página
loadProduct(pid);
