
async function userDate() {
  try {
    let res = await fetch("/api/sessions/online");
    res = await res.json();
    const data = res.userId;


    const template = (data) => `
  <div class="d-flex justify-content-center  mt-5" style=""width: 10rem;"">
   <div class="card" style="width: 18rem;">
    <img src="${data.photo}" class="card-img-top" alt="${data.email}">
    <div class="card-body">
      <h5 class="card-title">${data.email}</h5>
    </div>
  </div>`
    let response = await fetch("/api/users/" + data)
    response = await response.json()
    const user = response.response;
    const userHtml = template(user)
    document.querySelector("#userDate").innerHTML = userHtml;
  } catch (error) {
    return next(error)
  }


}


document.addEventListener("DOMContentLoaded", function () {

  userDate(); // Llama a la userDate() cuando se carga el DOM
});

