import { useEffect, useState } from "react";

function Viajes() {
    const [viajes, setViajes] = useState([]);
    const [camiones, setCamiones] = useState([]);
    const [conductores, setConductores] = useState([]);
    
    const [nuevoViaje, setNuevoViaje] = useState({
        fk_camion: "",
        fk_conductor: "",
        fecha_salida: "",
        fecha_llegada: "",
        producto_carga: "",
        origen: "",
        destino: "",
        valor_flete: ""
    });

    useEffect(() => {
        obtenerViajes();
        obtenerCamiones();
        obtenerConductores();
    }, []);

    const obtenerViajes = () => {
        fetch("https://proyectweb-1t6d.onrender.com/api/v1/viajes")
            .then(res => res.json())
            .then(data => setViajes(data))
            .catch(err => console.error("Error cargando viajes:", err));
    };

    const obtenerCamiones = () => {
        fetch("https://proyectweb-1t6d.onrender.com/api/v1/camiones")
            .then(res => res.json())
            .then(data => setCamiones(data))
            .catch(err => console.error("Error cargando camiones:", err));
    };

    const obtenerConductores = () => {
        fetch("https://proyectweb-1t6d.onrender.com/api/v1/conductores")
            .then(res => res.json())
            .then(data => setConductores(data))
            .catch(err => console.error("Error cargando conductores:", err));
    };

    const handleChange = (e) => {
        setNuevoViaje({
            ...nuevoViaje,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (nuevoViaje.valor_flete < 0) {
            alert("El valor del flete no puede ser negativo.");
            return; 
        }
        
        const salida = new Date(nuevoViaje.fecha_salida);
        const llegada = new Date(nuevoViaje.fecha_llegada);
        if (llegada < salida) {
            alert("La fecha de llegada no puede ser anterior a la fecha de salida.");
            return; 
        }

        fetch("https://proyectweb-1t6d.onrender.com/api/v1/viajes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevoViaje),
        })
        .then(async (res) => {
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Error al crear viaje");
            return data;
        })
        .then(() => {
            alert("¡Viaje creado con éxito!");
            obtenerViajes(); 
            setNuevoViaje({
                fk_camion: "", fk_conductor: "", fecha_salida: "", fecha_llegada: "",
                producto_carga: "", origen: "", destino: "", valor_flete: ""
            });
        })
        .catch((err) => alert(err.message));
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Programar Nuevo Viaje</h2>
            
            <form onSubmit={handleSubmit} style={{ marginBottom: "30px", border: "1px solid #ccc", padding: "15px", borderRadius: "5px", maxWidth: "400px" }}>
                
                <div style={{ marginBottom: "10px" }}>
                    <label style={{ display: "block" }}>Camión:</label>
                    <select name="fk_camion" value={nuevoViaje.fk_camion} onChange={handleChange} required style={{ width: "100%" }}>
                        <option value="">-- Seleccione un Camión --</option>
                        {camiones.map((c) => (
                            <option key={c.id_camion} value={c.id_camion}>
                            {c.marca} {c.modelo} (Capacidad: {c.capacidad}T)
                            </option>
                        ))}
                    </select>
                </div>

                <div style={{ marginBottom: "10px" }}>
                    <label style={{ display: "block" }}>Conductor:</label>
                    <select name="fk_conductor" value={nuevoViaje.fk_conductor} onChange={handleChange} required style={{ width: "100%" }}>
                        <option value="">-- Seleccione un Conductor --</option>
                        {conductores.map((con) => (
                            <option key={con.id_conductor} value={con.id_conductor}>
                                {con.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div style={{ marginBottom: "10px" }}>
                    <label style={{ display: "block" }}>Fecha de Salida:</label>
                    <input type="date" name="fecha_salida" value={nuevoViaje.fecha_salida} onChange={handleChange} required style={{ width: "100%" }} />
                </div>

                <div style={{ marginBottom: "10px" }}>
                    <label style={{ display: "block" }}>Fecha de Llegada:</label>
                    <input type="date" name="fecha_llegada" value={nuevoViaje.fecha_llegada} onChange={handleChange} required style={{ width: "100%" }} />
                </div>

                <div style={{ marginBottom: "10px" }}>
                    <label style={{ display: "block" }}>Producto a Cargar:</label>
                    <input type="text" name="producto_carga" placeholder="Ej. Cemento" value={nuevoViaje.producto_carga} onChange={handleChange} required style={{ width: "100%" }} />
                </div>

                <div style={{ marginBottom: "10px" }}>
                    <label style={{ display: "block" }}>Origen:</label>
                    <input type="text" name="origen" placeholder="Ciudad de Origen" value={nuevoViaje.origen} onChange={handleChange} required style={{ width: "100%" }} />
                </div>

                <div style={{ marginBottom: "10px" }}>
                    <label style={{ display: "block" }}>Destino:</label>
                    <input type="text" name="destino" placeholder="Ciudad de Destino" value={nuevoViaje.destino} onChange={handleChange} required style={{ width: "100%" }} />
                </div>

                <div style={{ marginBottom: "10px" }}>
                    <label style={{ display: "block" }}>Valor del Flete ($):</label>
                    <input type="number" name="valor_flete" placeholder="Ej. 1500000" value={nuevoViaje.valor_flete} onChange={handleChange} required style={{ width: "100%" }} />
                </div>

                <button type="submit" style={{ backgroundColor: "#4CAF50", color: "white", padding: "8px 15px", border: "none", cursor: "pointer" }}>
                    Guardar Viaje
                </button>
            </form>

            <hr />

            <h3>Lista de Viajes Registrados</h3>
            {viajes.length === 0 ? (
                <p>No hay viajes registrados o cargando...</p>
            ) : (
                <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                    <thead style={{ backgroundColor: "#4a4e69" }}>
                        <tr>
                            <th>ID</th>
                            <th>Camión</th>
                            <th>Conductor</th>
                            <th>Salida</th>
                            <th>Llegada</th>
                            <th>Carga</th>
                            <th>Ruta (Origen - Destino)</th>
                            <th>Flete ($)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {viajes.map((viaje) => (
                            <tr key={viaje.id_viaje}>
                                <td>{viaje.id_viaje}</td>
                                <td>{viaje.camion_marca}</td>
                                <td>{viaje.conductor_nombre}</td>
                                <td>{viaje.fecha_salida ? viaje.fecha_salida.split('T')[0] : ''}</td>
                                <td>{viaje.fecha_llegada ? viaje.fecha_llegada.split('T')[0] : ''}</td>
                                <td>{viaje.producto_carga}</td>
                                <td>{viaje.origen} -- {viaje.destino}</td>
                                <td>${viaje.valor_flete}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Viajes;