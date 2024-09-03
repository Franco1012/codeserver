document.querySelector("#registerUser").addEventListener("click", async () => {
    try {
        const data = {
            photo: document.querySelector("#photo").value || undefined,
            email: document.querySelector("#email").value,
            password: document.querySelector("#password").value
        }
        console.log(data)
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