// Manejar el restablecimiento de la contraseña
document.querySelector('#updatePassword').addEventListener('click', async (e) => {
    const urlParams = new URLSearchParams(window.location.search);
    const resetToken = urlParams.get('resetToken');

    const newPassword = document.querySelector('#newPassword').value;

    // Validar que el nuevo password no esté vacío
    if (!newPassword) {
        alert("Password cannot be empty");
        return;
    }

    const response = await fetch('/api/sessions/password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resetToken, newPassword })
    });

    // Manejar posibles errores en la respuesta
    if (!response.ok) {
        const errorResult = await response.json();
        alert(`Error: ${errorResult.message}`);
        return;
    }

    const result = await response.json();
    alert(result.message);
    document.querySelector('#newPassword').value=""
    location.replace("http://localhost:8080/pages/login.html")
});
