import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    // 1. Revisamos si hay un token y datos de usuario guardados
    const token = localStorage.getItem("token");
    const usuarioData = localStorage.getItem("usuario");
    const usuario = usuarioData ? JSON.parse(usuarioData) : null;
    // 2. Función para salir
    const cerrarSesion = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        alert("Sesión cerrada correctamente");
        navigate("/login"); // Nos manda al login al salir
    };  
    
    return (
        <nav style={{ 
            backgroundColor: "#333", 
            padding: "15px 20px", 
            color: "white", 
            display: "flex", 
            alignItems: "center",
            gap: "20px" 
        }}>
            <Link to="/" style={linkStyle}>Inicio</Link>

            {/* Solo mostramos estas opciones si hay alguien logueado */}
            {token && (
                <>
                    <Link to="/camiones" style={linkStyle}>Camiones</Link>
                    <Link to="/conductores" style={linkStyle}>Conductores</Link>
                    <Link to="/viajes" style={linkStyle}>Viajes</Link>
                </>
            )}

            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "15px" }}>
                {token ? (
                    <>
                        <span style={{ fontSize: "0.9rem", color: "#aaa" }}>
                            Hola, <strong>{usuario?.email}</strong>
                        </span>
                        <button 
                            onClick={cerrarSesion} 
                            style={{ 
                                backgroundColor: "#ff4d4d", 
                                color: "white", 
                                border: "none", 
                                padding: "8px 12px", 
                                borderRadius: "5px", 
                                cursor: "pointer" 
                            }}
                        >
                            Cerrar Sesión
                        </button>
                    </>
                ) : (
                    <Link to="/login" style={{ ...linkStyle, color: "#4CAF50", fontWeight: "bold" }}>
                        Ingresar
                    </Link>
                )}
            </div>
        </nav>
    );
}
// Un pequeño objeto de estilos para no repetir código
const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontSize: "1rem"
};

export default Navbar;