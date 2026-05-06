document.getElementById("loginForm").addEventListener("submit", async (e) => {
e.preventDefault();

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

try {
    const res = await fetch("http://localhost:3000/api/v1/auth/login", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.success) {
        alert("Login exitoso");

        localStorage.setItem("token", data.data.token);
        localStorage.setItem("usuario", JSON.stringify(data.data.usuario));

        window.location.href = "dashboard.html";
    } else {
        alert("Correo o contraseña incorrectos");
    }

} catch (error) {
    console.error("Error:", error);
}
});