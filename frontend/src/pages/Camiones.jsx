import { useEffect, useState } from "react";

function Camiones() {
    const [camiones, setCamiones] = useState([]);
    const [conductores, setConductores] = useState([]);
    const [nuevoCamion, setNuevoCamion] = useState({
        marca: "",
        modelo: "",
        capacidad: "",
        estado: true,
        fk_conductor: ""
    });
    const [editando, setEditando] = useState(false);
    const [idEditar, setIdEditar] = useState(null);

    useEffect(() => {
        obtenerCamiones();
        fetch("https://proyectweb-1t6d.onrender.com/api/v1/conductores")
            .then(res => res.json())
            .then(data => setConductores(data))
            .catch(err => console.error(err));
    }, []);

    const obtenerCamiones = () => {
        fetch("https://proyectweb-1t6d.onrender.com/api/v1/camiones")
            .then(res => res.json())
            .then(data => setCamiones(data));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = editando
            ? `hhttps://proyectweb-1t6d.onrender.com/api/v1/camion/${idEditar}`
            : "hhttps://proyectweb-1t6d.onrender.com/api/v1/camion";
        const metodo = editando ? "PUT" : "POST";

        fetch(url, {
            method: metodo,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevoCamion),
        })
        .then(async (res) => {
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            return data;
        })
        .then(() => {
            alert(editando ? "Camión actualizado" : "Camión creado");
            obtenerCamiones();
            setNuevoCamion({ marca: "", modelo: "", capacidad: "", estado: true, fk_conductor: "" });
            setEditando(false);
        })
        .catch((err) => alert(err.message));
    };

    const eliminarCamion = (id) => {
        if (!window.confirm("¿Seguro que quieres eliminar este camión?")) return;
        fetch(`https://proyectweb-1t6d.onrender.com/api/v1/camion/${id}`, { method: "DELETE" })
        .then(() => {
            alert("Camión eliminado");
            setCamiones(camiones.filter(c => c.id_camion !== id));
        })
        .catch((err) => alert("Error: " + err.message));
    };

    const cargarCamion = (camion) => {
        setNuevoCamion({
            marca: camion.marca,
            modelo: camion.modelo,
            capacidad: camion.capacidad,
            estado: camion.estado,
            fk_conductor: camion.fk_conductor || ""
        });
        setEditando(true);
        setIdEditar(camion.id_camion);
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>{editando ? "Editar Camión" : "Registrar Nuevo Camión"}</h2>
            
            <form onSubmit={handleSubmit} style={{ marginBottom: "30px", border: "1px solid #ccc", padding: "15px", borderRadius: "5px", maxWidth: "400px" }}>
                <div style={{ marginBottom: "10px" }}>
                    <label style={{ display: "block" }}>Marca:</label>
                    <input
                        type="text"
                        value={nuevoCamion.marca}
                        onChange={(e) => setNuevoCamion({ ...nuevoCamion, marca: e.target.value })}
                        required
                        style={{ width: "100%" }}
                    />
                </div>

                <div style={{ marginBottom: "10px" }}>
                    <label style={{ display: "block" }}>Modelo:</label>
                    <input
                        type="text"
                        value={nuevoCamion.modelo}
                        onChange={(e) => setNuevoCamion({ ...nuevoCamion, modelo: e.target.value })}
                        required
                        style={{ width: "100%" }}
                    />
                </div>

                <div style={{ marginBottom: "10px" }}>
                    <label style={{ display: "block" }}>Capacidad (Toneladas):</label>
                    <input
                        type="number"
                        value={nuevoCamion.capacidad}
                        onChange={(e) => setNuevoCamion({ ...nuevoCamion, capacidad: e.target.value })}
                        required
                        style={{ width: "100%" }}
                    />
                </div>

                <div style={{ marginBottom: "10px" }}>
                    <label style={{ display: "block" }}>Conductor Asignado:</label>
                    <select
                        value={nuevoCamion.fk_conductor}
                        onChange={(e) => setNuevoCamion({ ...nuevoCamion, fk_conductor: e.target.value })}
                        style={{ width: "100%" }}
                    >
                        <option value="">Seleccione conductor</option>
                        {conductores.map((conductor) => (
                            <option key={conductor.id_conductor} value={conductor.id_conductor}>
                                {conductor.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" style={{ backgroundColor: "#4CAF50", color: "white", padding: "8px 15px", border: "none", cursor: "pointer" }}>
                    {editando ? "Actualizar Camión" : "Guardar Camión"}
                </button>
                {editando && (
                    <button onClick={() => { setEditando(false); setNuevoCamion({ marca: "", modelo: "", capacidad: "", estado: true, fk_conductor: "" }); }} 
                            style={{ marginLeft: "10px" }}>
                        Cancelar
                    </button>
                )}
            </form>

            <hr />

            <h3>Lista de Camiones Registrados</h3>
            <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                <thead>
                    <tr style={{ backgroundColor: "#4a4e69" }}>
                        <th>ID</th>
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Capacidad</th>
                        <th>Conductor</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {camiones.map((camion) => (
                        <tr key={camion.id_camion}>
                            <td>{camion.id_camion}</td>
                            <td>{camion.marca}</td>
                            <td>{camion.modelo}</td>
                            <td>{camion.capacidad}</td>
                            <td>{camion.conductor || "N/A"}</td>
                            <td>
                                <button onClick={() => cargarCamion(camion)} style={{ marginRight: "5px" }}>Editar</button>
                                <button onClick={() => eliminarCamion(camion.id_camion)} style={{ backgroundColor: "#d00000" }}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Camiones;