//obtener el id del producto de la url
//console.log(location)
const queries = new URL(location.href)
const pid = queries.searchParams.get("id")
//console.log(pid)

const template = (data) => `<div class="container d-flex flex-wrap justify-content-center">
    <div class="card" style="width: 18rem;">
        <img
            src="${data.photo}"
            class="card-img-top"
            alt="${data.title}"
        />
        <div class="card-body">
            <h5 class="card-title">${data.title}</h5>
            <button class="btn btn-primary" onclick="addToCartButton('${data._id}')">Add Cart</button>
        </div>
    </div>
</div>`;


fetch("/api/products/" + pid)
    .then(res => res.json())
    .then(res => {
        console.log(res)
        const product = res.response;
        const productHtml = template(product)
        document.querySelector("#product").innerHTML = productHtml;


    }).catch(err => console.log(err))

async function addToCartButton(pid) {
    try {
        const data = {
            user_id: "662d1bffa97e80a63ede5325",
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

        const response = await fetch("/api/carts", opts);


    } catch (error) {
        console.error(error);
    }
}
