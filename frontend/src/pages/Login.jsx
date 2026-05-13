import React, { useState } from "react";
import { Mail, Lock, Truck, ArrowRight, UserPlus, ShieldCheck } from "lucide-react";
import { toast } from "react-hot-toast";

function Login() {
    const [esRegistro, setEsRegistro] = useState(false);
    const [cargando, setCargando] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        fk_rol: 1 
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setCargando(true);
        
        const endpoint = esRegistro ? "register" : "login";    
        
        fetch(`https://proyectweb-1t6d.onrender.com/api/v1/auth/${endpoint}`, {
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
                toast.success("¡Cuenta creada! Ya puedes iniciar sesión", { icon: '🎉' });
                setEsRegistro(false);
            } else {
                const tokenReal = respuestaServidor.data?.token;
                if (tokenReal) {
                    localStorage.setItem("token", tokenReal);
                    localStorage.setItem("usuario", JSON.stringify(respuestaServidor.data.usuario));
                    
                    toast.success(`¡Bienvenido al sistema!`, { duration: 3000 });

                    setTimeout(() => {
                        window.location.href = "/"; 
                    }, 1500);
                } else {
                    toast.error("El servidor no devolvió un token válido.");
                }
            }
        })
        .catch((err) => {
            toast.error(err.message);
        })
        .finally(() => setCargando(false));
    };

    return (
        <div style={styles.pageWrapper}>
            <div style={styles.loginCard}>
                <div style={styles.header}>
                    <div style={styles.logoBadge}>
                        <Truck size={32} color="#fff" />
                    </div>
                    <h1 style={styles.title}>{esRegistro ? "Crear Cuenta" : "¡Hola de nuevo!"}</h1>
                    <p style={styles.subtitle}>
                        {esRegistro ? "Regístrate para empezar a gestionar" : "Ingresa tus credenciales de acceso"}
                    </p>
                </div>

                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Email</label>
                        <div style={styles.inputContainer}>
                            <Mail size={18} style={styles.icon} />
                            <input 
                                type="email" name="email" placeholder="correo@ejemplo.com" 
                                style={styles.input} value={formData.email} 
                                onChange={handleChange} required 
                            />
                        </div>
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Contraseña</label>
                        <div style={styles.inputContainer}>
                            <Lock size={18} style={styles.icon} />
                            <input 
                                type="password" name="password" placeholder="••••••••" 
                                style={styles.input} value={formData.password} 
                                onChange={handleChange} required 
                            />
                        </div>
                    </div>

                    {esRegistro && (
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Rol de Usuario</label>
                            <div style={styles.inputContainer}>
                                <ShieldCheck size={18} style={styles.icon} />
                                <select 
                                    name="fk_rol" value={formData.fk_rol} 
                                    onChange={handleChange} style={styles.select}
                                >
                                    <option value="1">Administrador</option>
                                    <option value="2">Coordinador</option>
                                    <option value="3">Conductor</option>
                                </select>
                            </div>
                        </div>
                    )}

                    <button 
                        type="submit" 
                        style={{...styles.submitBtn, opacity: cargando ? 0.7 : 1}}
                        disabled={cargando}
                    >
                        {cargando ? "Cargando..." : (
                            <span style={styles.btnContent}>
                                {esRegistro ? "Registrarme" : "Entrar al Sistema"}
                                {esRegistro ? <UserPlus size={18} /> : <ArrowRight size={18} />}
                            </span>
                        )}
                    </button>
                </form>

                <div style={styles.footer}>
                    <button onClick={() => setEsRegistro(!esRegistro)} style={styles.toggleBtn}>
                        {esRegistro ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate aquí"}
                    </button>
                </div>
            </div>
        </div>
    );
}

const styles = {
    pageWrapper: {
        minHeight: "100vh", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", // Fondo más profundo
        padding: "20px"
    },
    loginCard: {
        backgroundColor: "#ffffff", 
        borderRadius: "24px", 
        padding: "40px", 
        width: "100%",
        maxWidth: "400px", 
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)", 
        textAlign: "center"
    },
    header: { marginBottom: "30px" },
    logoBadge: {
        background: "#2563eb", 
        width: "60px", 
        height: "60px", 
        borderRadius: "16px",
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        margin: "0 auto 20px",
        boxShadow: "0 10px 15px -3px rgba(37, 99, 235, 0.4)"
    },
    title: { 
        fontSize: "28px", 
        fontWeight: "800", 
        color: "#1e293b", // Azul muy oscuro para contraste sobre blanco
        margin: "0",
        letterSpacing: "-0.025em"
    },
    subtitle: { 
        fontSize: "15px", 
        color: "#64748b", // Gris azulado legible
        marginTop: "8px" 
    },
    form: { display: "flex", flexDirection: "column", gap: "20px" },
    inputGroup: { textAlign: "left" },
    label: { 
        fontSize: "14px", 
        fontWeight: "600", 
        color: "#334155", // Gris oscuro para las etiquetas
        marginBottom: "6px", 
        display: "block",
        paddingLeft: "4px"
    },
    inputContainer: { position: "relative", display: "flex", alignItems: "center" },
    icon: { position: "absolute", left: "14px", color: "#64748b" },
    input: {
        width: "100%", 
        padding: "14px 14px 14px 45px", 
        borderRadius: "12px", 
        border: "2px solid #f1f5f9",
        fontSize: "15px", 
        color: "#1e293b", // Texto que escribe el usuario
        outline: "none", 
        backgroundColor: "#f8fafc",
        transition: "border-color 0.2s ease",
    },
    select: {
        width: "100%", 
        padding: "14px 14px 14px 45px", 
        borderRadius: "12px", 
        border: "2px solid #f1f5f9",
        fontSize: "15px", 
        color: "#1e293b",
        backgroundColor: "#f8fafc", 
        appearance: "none",
        cursor: "pointer"
    },
    submitBtn: {
        backgroundColor: "#2563eb", 
        color: "#ffffff", 
        padding: "16px", 
        borderRadius: "12px",
        border: "none", 
        fontWeight: "700", 
        fontSize: "16px",
        cursor: "pointer", 
        transition: "transform 0.1s ease, background-color 0.2s ease",
        boxShadow: "0 4px 6px -1px rgba(37, 99, 235, 0.2)"
    },
    btnContent: { display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" },
    footer: { marginTop: "25px" },
    toggleBtn: {
        background: "none", 
        border: "none", 
        color: "#2563eb", 
        fontSize: "14px",
        fontWeight: "600", 
        cursor: "pointer", 
        textDecoration: "none",
        transition: "color 0.2s ease"
    }
};

export default Login;