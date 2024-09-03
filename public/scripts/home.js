const template = (data) => `
  <div class="card m-2" style="width: 10rem;">
    <img src="${data.photo}" class="card-img-top img-fluid" alt="${data.title}">
    <div class="card-body d-flex flex-column justify-content-between align-items-center" style="min-height: 12rem;">
      <h5 class="card-title text-center">${data.title}</h5>
      <h3 class="mt-2">${data.price}</h3>
      <a href="/pages/details.html?id=${data._id}" class="btn btn-primary mt-2">Detail</a>
    </div>
  </div>
`;



let currentPage = 1;
const limitPerPage = 5;
let totalPages;



// Función para cargar la página inicial de productos
async function InitialPage(currentPage) {
  try {
    const sessionRes = await fetch("/api/sessions/online");
    const sessionData = await sessionRes.json();
    //El operador "?" se utiliza por si alguna parte de la cadena es null o undefined,
    // el acceso se detiene y devuelve undefined en lugar de lanzar un error.
    const userId = sessionData.response?.userId;
    const userRole = sessionData.response?.userRole;

    //console.log("userId", userId);
    //console.log("userRole", userRole);

    let apiUrl;

    // Si el usuario es premium y está en la página "My Products", cambia la URL
    if (userRole === 2 && window.location.pathname.includes("/myProducts")) {
      apiUrl = `/api/products/me?page=${currentPage}&limit=${limitPerPage}`;
    } else {
      apiUrl = `/api/products/paginate?page=${currentPage}&limit=${limitPerPage}`;
    }
    // Si userId y userRole están disponibles, agréguelos a la URL
    if (userId && userRole) {
      apiUrl += `&userId=${userId}&userRole=${userRole}`;
    }

    const productsRes = await fetch(apiUrl);
    const productsData = await productsRes.json();

    console.log(productsData);

    const products = productsData.response;
    const productsHtml = products.map(product => template(product)).join("");
    document.querySelector("#products").innerHTML = productsHtml;

    totalPages = productsData.info.totalPages;

  } catch (err) {
    console.error(err);
  }
}


// Función para cargar la siguiente página de productos
function NextPage() {
  if (currentPage < totalPages) {
    currentPage++;
    InitialPage(currentPage);
  }
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

