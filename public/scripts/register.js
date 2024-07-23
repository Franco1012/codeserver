document.querySelector("#registerUser").addEventListener("click", async () => {
    try {
        const photoInput = document.querySelector("#photo").value;
        const data = {
            photo: photoInput ? photoInput : undefined,
            email: document.querySelector("#email").value,
            password: document.querySelector("#password").value
        }
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
            location.replace("/pages/verified.html")

        }
        return alert(response.message)

    } catch (error) {
        console.log(error)
    }
});