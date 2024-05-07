const template = (data) => `
  <div class="card m-2" style="width: 10rem;">
    <img src="${data.photo}" class="card-img-top img-fluid" alt="${data.title}">
    <div class="card-body d-flex flex-column align-items-center">
      <h5 class="card-title">${data.title}</h5>
      <h3>${data.price}</h3>
      <a href="/pages/details.html?id=${data._id}" class="btn btn-primary">Detail</a>
    </div>
  </div>
`;


let currentPage = 1;
const limitPerPage = 5;

// Función para cargar la página inicial de productos
function InitialPage(currentPage) {
  fetch(`/api/products/paginate?page=${currentPage}&&limit=${limitPerPage}`)
    .then(res => res.json())
    .then(res => {
      console.log(res);
      const products = res.response;
      const productsHtml = products.map(product => template(product)).join("");
      document.querySelector("#products").innerHTML = productsHtml;
    })
    .catch(err => console.log(err));
}

// Función para cargar la siguiente página de productos
function NextPage() {
  currentPage++;
  InitialPage(currentPage);
}
// Función para cargar la página anterior de productos
function PrevPage() {
  if (currentPage > 1) { 
    currentPage--;
    InitialPage(currentPage);
  }
}


// Cargar la página inicial cuando se carga la página
document.addEventListener("DOMContentLoaded", () => {
  InitialPage(currentPage);
});

document.querySelector('#next').addEventListener('click', NextPage);
document.querySelector('#prev').addEventListener('click', PrevPage);