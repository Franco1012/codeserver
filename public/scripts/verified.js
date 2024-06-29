document.querySelector("#verified").addEventListener("click", async () => {
    const data = {
        email: document.querySelector("#email").value,
        code: document.querySelector("#code").value.trim()
    };
    console.log(data);
    const opts = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };
    let response = await fetch("/api/sessions/verify", opts);
    response = await response.json();
    //console.log(response);
    if (response.statusCode === 200) {
        return alert(response.message)
    } else {
        return alert(response.message)
    }
});