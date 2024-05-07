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


fetch("/api/carts?user_id=662d1bffa97e80a63ede5325")
    .then(res => res.json())
    .then(res => {
        console.log(res.response)
        const productsCart = res.response
        const productsCartHtml = productsCart.map((product) => template(product)).join("");
        document.querySelector("#productsOnCart").innerHTML = productsCartHtml
    })
    .catch(err => console.log(err))

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
