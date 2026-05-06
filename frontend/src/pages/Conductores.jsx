import { useEffect, useState } from "react";

function Conductores() {
    const [conductores, setConductores] = useState([]);
    
    const [nuevoConductor, setNuevoConductor] = useState({
        nombre: "", 
        telefono: "", 
        licencia_nro: "", 
        licencia_vence: "", 
        fk_usuario: "" 
    });

    const [editando, setEditando] = useState(false);
    const [idEditar, setIdEditar] = useState(null);

    const obtenerConductores = () => {
        fetch("http://localhost:3000/api/v1/conductores")
            .then(res => res.json())
            .then(data => setConductores(data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        obtenerConductores();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = editando
            ? `http://localhost:3000/api/v1/conductores/${idEditar}`
            : "http://localhost:3000/api/v1/conductor";
        
        const metodo = editando ? "PUT" : "POST";

        fetch(url, {
            method: metodo,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevoConductor),
        })
        .then(async (res) => {
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Error en el servidor");
            return data;
        })
        .then(() => {
            alert(editando ? "Conductor actualizado" : "Conductor creado");
            obtenerConductores();
            resetForm();
        })
        .catch((err) => alert(err.message));
    };

    const eliminarConductor = (id) => {
        if (!window.confirm("¿Seguro que quieres eliminar este conductor?")) return;
        
        fetch(`http://localhost:3000/api/v1/conductores/${id}`, {
            method: "DELETE",
        })
        .then(async (res) => {
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Error al eliminar");
            return data;
        })
        .then(() => {
            alert("Conductor eliminado");
            obtenerConductores();
        })
        .catch((err) => alert(err.message));
    };

    const cargarConductor = (conductor) => {
        setNuevoConductor({
            nombre: conductor.nombre, 
            telefono: conductor.telefono, 
            licencia_nro: conductor.licencia_nro, 
            licencia_vence: conductor.licencia_vence ? conductor.licencia_vence.split('T')[0] : "", 
            fk_usuario: conductor.fk_usuario || ""
        });
        setEditando(true);
        setIdEditar(conductor.id_conductor);
    };

    const resetForm = () => {
        setNuevoConductor({ nombre: "", telefono: "", licencia_nro: "", licencia_vence: "", fk_usuario: "" });
        setEditando(false);
        setIdEditar(null);
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>{editando ? "Editar Conductor" : "Registrar Nuevo Conductor"}</h2>
            
            <form onSubmit={handleSubmit} style={{ marginBottom: "30px", border: "1px solid #ccc", padding: "15px", borderRadius: "5px", maxWidth: "400px" }}>
                <div style={{ marginBottom: "10px" }}>
                    <label style={{ display: "block" }}>Nombre Completo:</label>
                    <input 
                        type="text" 
                        value={nuevoConductor.nombre} 
                        onChange={(e) => setNuevoConductor({...nuevoConductor, nombre: e.target.value})} 
                        required 
                        style={{ width: "100%" }}
                    />
                </div>

                <div style={{ marginBottom: "10px" }}>
                    <label style={{ display: "block" }}>Teléfono:</label>
                    <input 
                        type="text" 
                        value={nuevoConductor.telefono} 
                        onChange={(e) => setNuevoConductor({...nuevoConductor, telefono: e.target.value})} 
                        style={{ width: "100%" }}
                    />
                </div>

                <div style={{ marginBottom: "10px" }}>
                    <label style={{ display: "block" }}>Número de Licencia:</label>
                    <input 
                        type="text" 
                        value={nuevoConductor.licencia_nro} 
                        onChange={(e) => setNuevoConductor({...nuevoConductor, licencia_nro: e.target.value})} 
                        style={{ width: "100%" }}
                    />
                </div>

                <div style={{ marginBottom: "10px" }}>
                    <label style={{ display: "block" }}>Vencimiento Licencia:</label>
                    <input 
                        type="date" 
                        value={nuevoConductor.licencia_vence} 
                        onChange={(e) => setNuevoConductor({...nuevoConductor, licencia_vence: e.target.value})} 
                        style={{ width: "100%" }}
                    />
                </div>

                <button type="submit" style={{ backgroundColor: "#4CAF50", color: "white", padding: "8px 15px", border: "none", cursor: "pointer" }}>
                    {editando ? "Actualizar Conductor" : "Guardar Conductor"}
                </button>
                {editando && (
                    <button type="button" onClick={resetForm} style={{ marginLeft: "10px" }}>
                        Cancelar
                    </button>
                )}
            </form>

            <hr />

            <h3>Lista de Conductores Registrados</h3>
            <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                <thead>
                    <tr style={{ backgroundColor: "#4a4e69" }}>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Teléfono</th>
                        <th>Nro Licencia</th>
                        <th>Vencimiento</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {conductores.map((c) => (
                        <tr key={c.id_conductor}>
                            <td>{c.id_conductor}</td>
                            <td>{c.nombre}</td>
                            <td>{c.telefono}</td>
                            <td>{c.licencia_nro}</td>
                            <td>{c.licencia_vence ? c.licencia_vence.split('T')[0] : 'N/A'}</td>
                            <td>
                                <button onClick={() => cargarConductor(c)} style={{ marginRight: "5px" }}>Editar</button>
                                <button onClick={() => eliminarConductor(c.id_conductor)} style={{ backgroundColor: "#d00000" }}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Conductores;