const template = (data) => `<div class="card m-2" style="width: 10rem;">
<img
  src="${data.photo}"
  class="card-img-top img-fluid"
  alt="${data.title}"
/>
<div class="card-body d-flex flex-column align-items-center">
  <h5 class="card-title">${data.title}</h5>
  <h3>${data.price}</h3>
  <a
    href="http://localhost:8080/products/${data._id}"
    class="btn btn-primary"
  >Detail</a>
</div>
</div>`
fetch("/api/products/paginate")
    .then((res) => res.json())
    .then((res) => {
        console.log(res);
        const products = res.response.docs
        document.querySelector("#products").innerHTML = products.map(product=>template(product)).join("")
    }).catch((err) => console.log(err));
