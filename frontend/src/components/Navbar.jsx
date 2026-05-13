import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Truck, Menu, X, LogOut, UserCircle } from "lucide-react";
import { toast } from "react-hot-toast";

function Navbar() {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Revisamos si hay sesión
    const token = localStorage.getItem("token");
    const usuarioData = localStorage.getItem("usuario");
    const usuario = usuarioData ? JSON.parse(usuarioData) : null;

    // Función para salir
    const cerrarSesion = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        setMenuAbierto(false);
        toast.success("Sesión cerrada correctamente");
        navigate("/"); 
    };

    const toggleMenu = () => setMenuAbierto(!menuAbierto);
    const cerrarMenu = () => setMenuAbierto(false);

    // Ocultar el Navbar si estamos en la pantalla de Login
    if (location.pathname === "/login") return null;

    return (
        <nav style={styles.nav}>
            <div style={styles.container}>
                {/* Logo */}
                <Link to="/" style={styles.logo} onClick={cerrarMenu}>
                    <Truck size={28} color="#2563eb" />
                    <span style={styles.logoText}>TransRoute</span>
                </Link>

                {/* Botón Hamburguesa (Móvil) */}
                <button style={styles.menuBtn} onClick={toggleMenu}>
                    {menuAbierto ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Enlaces PC */}
                <div style={styles.desktopMenu}>
                    {token && (
                        <>
                            {/* Módulos basados en la base de datos */}
                            <div style={styles.linksContainer}>
                                <Link to="/camiones" style={styles.link}>Camiones</Link>
                                <Link to="/conductores" style={styles.link}>Conductores</Link>
                                <Link to="/viajes" style={styles.link}>Viajes</Link>
                                <Link to="/mantenimientos" style={styles.link}>Mantenimientos</Link>
                                <Link to="/gastos" style={styles.link}>Gastos</Link>
                                <Link to="/facturas" style={styles.link}>Facturas</Link>
                                <Link to="/clientes" style={styles.link}>Clientes</Link>
                                <Link to="/pedidos" style={styles.link}>Pedidos</Link>
                                <Link to="/productos" style={styles.link}>Productos</Link>
                                <Link to="/repartidores" style={styles.link}>Repartidores</Link>
                            </div>
                            
                            <div style={styles.userInfo}>
                                <UserCircle size={20} color="#64748b" />
                                <span style={styles.userEmail}>{usuario?.email}</span>
                            </div>
                            
                            <button onClick={cerrarSesion} style={styles.logoutBtn} title="Cerrar Sesión">
                                <LogOut size={18} />
                            </button>
                        </>
                    )}
                    
                    {!token && (
                        <Link to="/login" style={styles.loginBtn}>Ingresar</Link>
                    )}
                </div>
            </div>

            {/* Menú Móvil */}
            {menuAbierto && (
                <div style={styles.mobileMenu}>
                    {token ? (
                        <>
                            <div style={styles.mobileUserInfo}>
                                <UserCircle size={20} />
                                <span>{usuario?.email}</span>
                            </div>
                            
                            {/* Módulos en versión móvil */}
                            <Link to="/camiones" style={styles.mobileLink} onClick={cerrarMenu}>Camiones</Link>
                            <Link to="/conductores" style={styles.mobileLink} onClick={cerrarMenu}>Conductores</Link>
                            <Link to="/viajes" style={styles.mobileLink} onClick={cerrarMenu}>Viajes</Link>
                            <Link to="/mantenimientos" style={styles.mobileLink} onClick={cerrarMenu}>Mantenimientos</Link>
                            <Link to="/gastos" style={styles.mobileLink} onClick={cerrarMenu}>Gastos</Link>
                            <Link to="/facturas" style={styles.mobileLink} onClick={cerrarMenu}>Facturas</Link>
                            <Link to="/clientes" style={styles.mobileLink} onClick={cerrarMenu}>Clientes</Link>
                            <Link to="/pedidos" style={styles.mobileLink} onClick={cerrarMenu}>Pedidos</Link>
                            <Link to="/productos" style={styles.mobileLink} onClick={cerrarMenu}>Productos</Link>
                            <Link to="/repartidores" style={styles.mobileLink} onClick={cerrarMenu}>Repartidores</Link>
                            
                            <button onClick={cerrarSesion} style={styles.mobileLogoutBtn}>
                                <LogOut size={20} /> Cerrar Sesión
                            </button>
                        </>
                    ) : (
                        <Link to="/login" style={styles.mobileLoginBtn} onClick={cerrarMenu}>
                            Ingresar
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
}

// Estilos modernos
const styles = {
    nav: {
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e2e8f0",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
    },
    container: {
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "0 20px",
        minHeight: "70px", // Cambiado a minHeight por si los enlaces hacen salto de línea
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    logo: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        textDecoration: "none",
        marginRight: "20px",
    },
    logoText: {
        fontSize: "22px",
        fontWeight: "800",
        color: "#1e293b",
    },
    menuBtn: {
        background: "none",
        border: "none",
        cursor: "pointer",
        color: "#1e293b",
        display: "flex", 
    },
    desktopMenu: {
        display: "flex",
        alignItems: "center",
        gap: "15px",
        flex: 1,
        justifyContent: "flex-end",
        padding: "10px 0", // Espaciado por si los enlaces bajan de línea
    },
    linksContainer: {
        display: "flex",
        gap: "15px",
        marginRight: "auto",
        flexWrap: "wrap", // Permite que los enlaces bajen si la pantalla es más pequeña
        justifyContent: "center",
    },
    link: {
        textDecoration: "none",
        color: "#475569",
        fontWeight: "600",
        fontSize: "14px",
        transition: "color 0.2s",
        whiteSpace: "nowrap",
    },
    userInfo: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        paddingLeft: "15px",
        borderLeft: "2px solid #e2e8f0",
    },
    userEmail: {
        fontSize: "14px",
        color: "#64748b",
        fontWeight: "500",
    },
    logoutBtn: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fef2f2",
        color: "#dc2626",
        border: "none",
        padding: "8px",
        borderRadius: "8px",
        fontWeight: "600",
        cursor: "pointer",
        transition: "background 0.2s",
    },
    loginBtn: {
        backgroundColor: "#2563eb",
        color: "white",
        textDecoration: "none",
        padding: "10px 20px",
        borderRadius: "8px",
        fontWeight: "600",
    },
    mobileMenu: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff",
        borderTop: "1px solid #e2e8f0",
        padding: "10px 20px 20px",
        position: "absolute",
        top: "100%",
        left: 0,
        right: 0,
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
        maxHeight: "80vh",
        overflowY: "auto", // Scroll interno para celular si hay muchos módulos
    },
    mobileUserInfo: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "15px 0",
        borderBottom: "1px solid #e2e8f0",
        marginBottom: "10px",
        color: "#64748b",
        fontWeight: "500",
    },
    mobileLink: {
        textDecoration: "none",
        color: "#1e293b",
        fontWeight: "600",
        fontSize: "16px",
        padding: "12px 0",
        borderBottom: "1px solid #f1f5f9",
    },
    mobileLogoutBtn: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        backgroundColor: "#fef2f2",
        color: "#dc2626",
        border: "none",
        padding: "12px",
        borderRadius: "8px",
        fontWeight: "600",
        marginTop: "15px",
        width: "100%",
    },
    mobileLoginBtn: {
        backgroundColor: "#2563eb",
        color: "white",
        textDecoration: "none",
        padding: "12px",
        borderRadius: "8px",
        fontWeight: "600",
        textAlign: "center",
        marginTop: "10px",
    }
};

export default Navbar;