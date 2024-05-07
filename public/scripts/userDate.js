//obtener el id del producto de la url
//console.log(location)
const queries = new URL(location.href)
const uid = queries.searchParams.get("id")
console.log(uid)

const template = (data) => `
<div class="d-flex m-2" style=""width: 10rem;"">
 <div class="card" style="width: 18rem;">
  <img src="${data.photo}" class="card-img-top" alt="${data.email}">
  <div class="card-body">
    <h5 class="card-title">${data.email}</h5>
  </div>
</div>
  <p>USER NOT FOUND</p>


</div>`

fetch("/api/users/" + uid)
.then(res=>res.json())
.then(res=>{
    console.log(res)
    const user = res.response;
    const userHtml = template(user)
    document.querySelector("#userDate").innerHTML = userHtml;
})