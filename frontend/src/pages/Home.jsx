import React from "react";
import { Link } from "react-router-dom";
import { Truck, Map, Users, ShieldCheck, ArrowRight, BarChart3 } from "lucide-react";

function Home() {
    return (
        <div style={styles.container}>
            <section style={styles.heroSection}>
                <div style={styles.badge}>Logística Inteligente</div>
                <h1 style={styles.heroTitle}>
                    Toma el control total de tu <span style={styles.highlight}>Flota y Rutas</span>
                </h1>
                <p style={styles.heroSubtitle}>
                    TransRoute Pro es la plataforma definitiva para gestionar camiones, asignar conductores, 
                    monitorear viajes y optimizar tus gastos operativos en tiempo real.
                </p>
                <div style={styles.heroActions}>
                    <Link to="/login" style={styles.primaryBtn}>
                        Comenzar Ahora <ArrowRight size={20} />
                    </Link>
                </div>
            </section>

            <section style={styles.featuresSection}>
                <h2 style={styles.sectionTitle}>Todo lo que necesitas en un solo lugar</h2>
                
                <div style={styles.grid}>
                    <div style={styles.card}>
                        <div style={{...styles.iconWrapper, backgroundColor: "#dbeafe", color: "#2563eb"}}>
                            <Truck size={28} />
                        </div>
                        <h3 style={styles.cardTitle}>Gestión de Camiones</h3>
                        <p style={styles.cardText}>
                            Mantén el registro de tu flota, modelos, placas y planifica los mantenimientos preventivos sin perder detalle.
                        </p>
                    </div>

                    <div style={styles.card}>
                        <div style={{...styles.iconWrapper, backgroundColor: "#dcfce7", color: "#16a34a"}}>
                            <Map size={28} />
                        </div>
                        <h3 style={styles.cardTitle}>Control de Viajes</h3>
                        <p style={styles.cardText}>
                            Asigna rutas, establece fechas de salida/llegada y calcula los fletes exactos para cada recorrido.
                        </p>
                    </div>

                    <div style={styles.card}>
                        <div style={{...styles.iconWrapper, backgroundColor: "#f3e8ff", color: "#9333ea"}}>
                            <Users size={28} />
                        </div>
                        <h3 style={styles.cardTitle}>Equipo de Conductores</h3>
                        <p style={styles.cardText}>
                            Administra las licencias, asigna camiones específicos a cada conductor y mantén tu equipo organizado.
                        </p>
                    </div>

                    <div style={styles.card}>
                        <div style={{...styles.iconWrapper, backgroundColor: "#ffedd5", color: "#ea580c"}}>
                            <BarChart3 size={28} />
                        </div>
                        <h3 style={styles.cardTitle}>Control de Gastos</h3>
                        <p style={styles.cardText}>
                            Registra peajes, combustible, viáticos y genera facturas para tener total claridad de la rentabilidad.
                        </p>
                    </div>
                </div>
            </section>

            <footer style={styles.footer}>
                <p>© 2026 TransRoute Pro. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}

// Estilos
const styles = {
    container: {
        fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        color: "#1e293b",
        marginTop: "-20px",
    },
    heroSection: {
        background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)",
        color: "white",
        padding: "80px 20px",
        textAlign: "center",
        borderRadius: "0 0 40px 40px",
        boxShadow: "0 10px 30px -10px rgba(0,0,0,0.3)",
    },
    badge: {
        display: "inline-block",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        padding: "6px 16px",
        borderRadius: "20px",
        fontSize: "14px",
        fontWeight: "600",
        marginBottom: "20px",
        backdropFilter: "blur(5px)",
    },
    heroTitle: {
        fontSize: "clamp(32px, 5vw, 56px)",
        fontWeight: "800",
        margin: "0 auto 20px",
        maxWidth: "800px",
        lineHeight: "1.2",
    },
    highlight: {
        color: "#60a5fa",
    },
    heroSubtitle: {
        fontSize: "clamp(16px, 2vw, 20px)",
        color: "#94a3b8",
        maxWidth: "600px",
        margin: "0 auto 40px",
        lineHeight: "1.6",
    },
    heroActions: {
        display: "flex",
        justifyContent: "center",
        gap: "15px",
    },
    primaryBtn: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        backgroundColor: "#2563eb",
        color: "white",
        padding: "16px 32px",
        borderRadius: "12px",
        textDecoration: "none",
        fontSize: "18px",
        fontWeight: "bold",
        boxShadow: "0 4px 15px rgba(37, 99, 235, 0.4)",
        transition: "transform 0.2s",
    },
    featuresSection: {
        padding: "80px 20px",
        maxWidth: "1200px",
        margin: "0 auto",
        textAlign: "center",
    },
    sectionTitle: {
        fontSize: "32px",
        fontWeight: "bold",
        marginBottom: "50px",
        color: "#0f172a",
    },
    grid: {
        display: "flex",
        flexWrap: "wrap",
        gap: "30px",
        justifyContent: "center",
    },
    card: {
        backgroundColor: "white",
        borderRadius: "20px",
        padding: "30px",
        width: "100%",
        maxWidth: "260px",
        boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05)",
        border: "1px solid #f1f5f9",
        textAlign: "left",
        flex: "1 1 260px",
    },
    iconWrapper: {
        width: "60px",
        height: "60px",
        borderRadius: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "20px",
    },
    cardTitle: {
        fontSize: "20px",
        fontWeight: "700",
        marginBottom: "12px",
        color: "#1e293b",
    },
    cardText: {
        fontSize: "15px",
        color: "#64748b",
        lineHeight: "1.6",
    },
    // --- FOOTER ---
    footer: {
        textAlign: "center",
        padding: "30px 20px",
        borderTop: "1px solid #e2e8f0",
        color: "#94a3b8",
        fontSize: "14px",
    }
};

export default Home;