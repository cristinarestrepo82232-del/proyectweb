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
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)", padding: "20px"
    },
    loginCard: {
        backgroundColor: "#fff", borderRadius: "20px", padding: "40px", width: "100%",
        maxWidth: "400px", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.3)", textAlign: "center"
    },
    header: { marginBottom: "30px" },
    logoBadge: {
        background: "#2563eb", width: "50px", height: "50px", borderRadius: "12px",
        display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 15px"
    },
    title: { fontSize: "24px", fontWeight: "bold", color: "#0f172a", margin: "0" },
    subtitle: { fontSize: "14px", color: "#64748b", marginTop: "5px" },
    form: { display: "flex", flexDirection: "column", gap: "18px" },
    inputGroup: { textAlign: "left" },
    label: { fontSize: "13px", fontWeight: "600", color: "#475569", marginBottom: "5px", display: "block" },
    inputContainer: { position: "relative", display: "flex", alignItems: "center" },
    icon: { position: "absolute", left: "12px", color: "#94a3b8" },
    input: {
        width: "100%", padding: "12px 12px 12px 40px", borderRadius: "10px", border: "1px solid #e2e8f0",
        fontSize: "15px", outline: "none", backgroundColor: "#f8fafc"
    },
    select: {
        width: "100%", padding: "12px 12px 12px 40px", borderRadius: "10px", border: "1px solid #e2e8f0",
        fontSize: "15px", backgroundColor: "#f8fafc", appearance: "none"
    },
    submitBtn: {
        backgroundColor: "#2563eb", color: "white", padding: "14px", borderRadius: "10px",
        border: "none", fontWeight: "600", cursor: "pointer", transition: "all 0.2s"
    },
    btnContent: { display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" },
    footer: { marginTop: "20px" },
    toggleBtn: {
        background: "none", border: "none", color: "#2563eb", fontSize: "14px",
        fontWeight: "500", cursor: "pointer", textDecoration: "underline"
    }
};

export default Login;