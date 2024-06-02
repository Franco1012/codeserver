const signout = document.querySelector("#signout")

signout.addEventListener("click", handleSignout)

async function handleSignout() {
    try {
        const opt = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        }
        let response = await fetch("/api/sessions/signout", opt)
        response = await response.json()
        console.log(response)
        if (response.statusCode === 200) {
            location.replace("/")
        }
    } catch (error) {
        console.log(error)
    }

}