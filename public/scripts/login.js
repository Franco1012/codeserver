

document.querySelector("#login").addEventListener("click", async () => {
    try {
        const data = {
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

        let response = await fetch("/api/sessions/login", opts)
        response = await response.json()
        console.log(response)
        if (response.statusCode === 200) {
            // Mostrar SweetAlert
            await Swal.fire({
                title: "¡Inicio de sesión exitoso!",
                text: response.message,
                icon: "success",
                timer: 3000, // Tiempo en milisegundos (2000 ms = 2 segundos)
                timerProgressBar: true
            });
        
            // Redirigir a otra página después de que SweetAlert se cierre
            location.replace("/");
        } else {
            // Mostrar SweetAlert en caso de error
            await Swal.fire({
                title: "Error",
                text: response.message,
                icon: "error",
                timer: 3000,
                timerProgressBar: true
            });
        }
        


    } catch (error) {
        console.log(error)
    }
})

// Manejar la solicitud de restablecimiento de contraseña
document.querySelector('#resetPasswordButton').addEventListener('click', async (e) => {
    const email = document.querySelector("#email").value
    if (!email) {
        alert("Ingrese su email");
        return;
    }
    const response = await fetch('/api/sessions/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    });
    const result = await response.json();
    alert(result.message);
});
