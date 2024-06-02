const template = (data) => `<div class="container d-flex flex-wrap justify-content-center">
<div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">${data.product_id.title}</h5>
    <p class="card-text">${data.product_id.price}</p>
    <div class="mb-3">
      <label for="quantity" class="form-label">Cantidad</label>
      <input type="number" class="form-control" id="quantity" value="1" min="1" required>
    </div>
    <button class="btn btn-primary mt-2" onclick="destroy('${data._id}')">Eliminar Producto</button>
  </div>
</div>
</div>
<div class="d-flex">
</div>
`;

async function cart() {
    try {

        let products = await fetch("/api/carts");
        products = await products.json();
        products = products.response; // Acceder directamente a products.response



        if (products && products.length > 0) { // Verificar si products es válido y tiene elementos
            const productsCartHtml = products.map((product) => template(product)).join("");
            document.querySelector("#productsOnCart").innerHTML = productsCartHtml;
        } else {
            document.querySelector("#productsOnCart").innerHTML = "<strong class='product-title' style='width: 100%; text-align: center'>No hay productos en tu carrito</strong>";
        }
    } catch (error) {
        console.error(error);
    }
}





document.addEventListener("DOMContentLoaded", function () {
    cart(); // Llama a la función cart() cuando se carga el DOM
});
async function destroy(cid) {
    try {


        const opts = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        };

        const response = await fetch("/api/carts/" + cid, opts);
        location.reload()//recarga la página
    } catch (error) {
        console.error(error);
    }
}

document.querySelector("#vaciarCarrito").addEventListener("click", vaciarCarrito)
async function vaciarCarrito() {
    try {

        const opts = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        };
        const response = await fetch("/api/carts/all", opts);
        location.reload()//recarga la página
    } catch (error) {
        console.log(error)
    }
}
