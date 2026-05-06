import { useState } from "react";

function Login() {
    // Estado para saber si estamos en Login o en Registro
    const [esRegistro, setEsRegistro] = useState(false);
    
    // Estado para los datos del formulario
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        fk_rol: 1 // Por defecto 1 (Admin) o el que prefieras
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // IMPORTANTE: Aquí usamos 'register' o 'login' según tu authRoutes.js
        const endpoint = esRegistro ? "register" : "login";    
        
        fetch(`http://localhost:3000/api/v1/auth/${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
            .then(async (res) => {
                const data = await res.json();
                if (!res.ok) throw new Error(data.message || data.error || "Error en la operación");
                return data;
            })
            .then((respuestaServidor) => {
                if (esRegistro) {
                    // Si es registro, avisamos y cambiamos a la vista de login
                    alert("¡Usuario registrado con éxito! Ahora puedes iniciar sesión.");
                    setEsRegistro(false);
                } else {
                    // Si es login, entramos a data y luego a token
                    const tokenReal = respuestaServidor.data?.token;

                    if (tokenReal) {
                        console.log("¡Token guardado!:", tokenReal);
                        localStorage.setItem("token", tokenReal);
                        
                        // Opcional: guardar también los datos del usuario
                        localStorage.setItem("usuario", JSON.stringify(respuestaServidor.data.usuario));
                        
                        alert("¡Bienvenido al sistema!");
                        // Redirigir al inicio después del login exitoso
                        window.location.href = "/"; 
                    } else {
                        alert("Error: El servidor no envió el token.");
                    }
                }
            })
            .catch((err) => alert(err.message));
    };

    return (
        <div style={{ maxWidth: "400px", margin: "80px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "10px", textAlign: "center" }}>
            <h1>{esRegistro ? "Crear Cuenta" : "Iniciar Sesión"}</h1>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <input 
                    type="email" name="email" placeholder="Correo electrónico" 
                    value={formData.email} onChange={handleChange} required 
                />
                <input 
                    type="password" name="password" placeholder="Contraseña" 
                    value={formData.password} onChange={handleChange} required 
                />
                {esRegistro && (
                    <select name="fk_rol" value={formData.fk_rol} onChange={handleChange}>
                        <option value="1">Administrador</option>
                        <option value="2">Coordinador</option>
                        <option value="3">Conductor</option>
                    </select>
                )}
                <button type="submit" style={{ backgroundColor: "#4CAF50", color: "white", padding: "10px", border: "none", cursor: "pointer" }}>
                    {esRegistro ? "Registrar" : "Entrar"}
                </button>
            </form>
            <button 
                onClick={() => setEsRegistro(!esRegistro)} 
                style={{ marginTop: "15px", background: "none", border: "none", color: "blue", textDecoration: "underline", cursor: "pointer" }}
            >
                {esRegistro ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate aquí"}
            </button>
        </div>
    );
}

export default Login;