//obtener el id de la url
console.log(location);
const queries=new URL(location.href)
const pid=queries.searchParams.get("pid")

fetch("/api/products/"+pid)
.then(res=>res,json())
.then(res=>{
    console.log(res)
}).catch(err=>console.log(err))