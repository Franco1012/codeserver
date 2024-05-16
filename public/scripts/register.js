document.querySelector("#registerUser").addEventListener("click", async () => {
    const data = {
        photo: document.querySelector("#photo").value,
        email: document.querySelector("#email").value,
        password: document.querySelector("#password").value
    }
    console.log("soy la data",data)
    const opts = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }

    let response = await fetch("/api/sessions/register", opts)
    response = await response.json()
    console.log(response)
    if (response.statusCode === 201) {
        location.replace("/pages/login.html")

    }
    return alert(response.message)
});



