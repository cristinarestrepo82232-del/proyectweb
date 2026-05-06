import { Link } from "react-router-dom";

function Home() {
    const token = localStorage.getItem("token");

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', color: '#333' }}>
            {/* SECCIÓN HERO (Principal) */}
            <header style={heroStyle}>
                <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>Sistema de Gestión Logística</h1>
                <p style={{ fontSize: '1.2rem', marginBottom: '30px', maxWidth: '600px' }}>
                    Control total sobre tus conductores, camiones y rutas en tiempo real. 
                    Optimiza la eficiencia de tu flota hoy mismo.
                </p>
                {!token ? (
                    <Link to="/login" style={buttonStyle}>Comenzar ahora</Link>
                ) : (
                    <Link to="/viajes" style={buttonStyle}>Gestionar Viajes</Link>
                )}
            </header>
            
            {/* SECCIÓN DE CARACTERÍSTICAS */}
            <section style={sectionStyle}>
                <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Nuestros Módulos</h2>
                <div style={gridStyle}>
                    <div style={cardStyle}>
                        <h3>Gestión de Camiones</h3>
                        <p>Control de placas, modelos y estado técnico de toda tu flota.</p>
                    </div>
                    <div style={cardStyle}>
                        <h3>Conductores</h3>
                        <p>Registro detallado de licencias, contactos y asignaciones de personal.</p>
                    </div>
                    <div style={cardStyle}>
                        <h3>Control de Viajes</h3>
                        <p>Seguimiento de rutas, fletes y destinos para una logística impecable.</p>
                    </div>
                </div>
            </section>
            
            {/* PIE DE PÁGINA */}
            <footer style={{ textAlign: 'center', padding: '40px', backgroundColor: '#f4f4f4' }}>
                <p>© 2026 Transportes Logísticos S.A. - Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}

// ESTILOS (Objetos JS)
const heroStyle = {
    background: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1519003722824-194d4455a60c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '70vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    textAlign: 'center',
    padding: '0 20px'
};
const buttonStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '15px 30px',
    textDecoration: 'none',
    borderRadius: '5px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    transition: '0.3s'
};
const sectionStyle = {
    padding: '60px 20px',
    maxWidth: '1200px',
    margin: '0 auto'
};
const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px'
};
const cardStyle = {
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    textAlign: 'center',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
};

export default Home;