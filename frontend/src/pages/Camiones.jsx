import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Truck, X } from "lucide-react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Camiones() {
    const [camiones, setCamiones] = useState([]);
    const [conductores, setConductores] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [editando, setEditando] = useState(false);
    const [idEditar, setIdEditar] = useState(null);
    const [form, setForm] = useState({
        marca: "",
        modelo: "",
        capacidad: "",
        estado: true,
        fk_conductor: ""
    });

    const navigate = useNavigate();

    const usuarioData = localStorage.getItem("usuario");
    const token = localStorage.getItem("token");
    const usuario = usuarioData ? JSON.parse(usuarioData) : null;

    const esAdmin = usuario?.rol === "Administrador";
    const esCoAdmin = usuario?.rol === "co_administrador"; 

    const puedeCrearYEditar = esAdmin || esCoAdmin;
    const puedeEliminar = esAdmin;

    const API_BASE = "https://proyectweb-1t6d.onrender.com/api/v1";

    const fetchHeaders = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };

    useEffect(() => {
        if (!token) {
            toast.error("No tienes autorización. Inicia sesión.");
            navigate("/login");
            return;
        }
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        try {
            const [resCamiones, resConductores] = await Promise.all([
                fetch(`${API_BASE}/camiones`, { headers: fetchHeaders }),
                fetch(`${API_BASE}/conductores`, { headers: fetchHeaders })
            ]);

            if (resCamiones.status === 401 || resCamiones.status === 403) {
                toast.error("Tu sesión ha expirado");
                localStorage.removeItem("token");
                localStorage.removeItem("usuario");
                navigate("/login");
                return;
            }

            const dataCamiones = await resCamiones.json();
            const dataConductores = await resConductores.json();

            let listaCamiones = Array.isArray(dataCamiones) ? dataCamiones : [];
            listaCamiones.sort((a, b) => a.id_camion - b.id_camion);

            setCamiones(listaCamiones);
            setConductores(Array.isArray(dataConductores) ? dataConductores : []);
            
            setLoading(false);
        } catch (error) {
            console.error("Error al cargar:", error);
            toast.error("Error de conexión con el servidor");
            setCamiones([]);
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const payload = {
            ...form,
            estado: form.estado ? 1 : 0
        };

        const url = editando ? `${API_BASE}/camion/${idEditar}` : `${API_BASE}/camion`;
        const metodo = editando ? "PUT" : "POST";

        try {
            const res = await fetch(url, {
                method: metodo,
                headers: fetchHeaders,
                body: JSON.stringify(payload),
            });
            
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || data.message || "Error al guardar");

            toast.success(editando ? "Camión actualizado" : "Camión registrado");
            cargarDatos();
            cerrarFormulario();
        } catch (error) {
            toast.error(error.message);
        }
    };

    const eliminarCamion = async (id) => {
        if (!window.confirm("¿Seguro que quieres eliminar este camión?")) return;

        try {
            const res = await fetch(`${API_BASE}/camion/${id}`, { 
                method: "DELETE",
                headers: fetchHeaders
            });
            
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || data.message || "Error al eliminar");
            }

            toast.success("Camión eliminado");
            setCamiones(camiones.filter(c => c.id_camion !== id));
        } catch (error) {
            toast.error(error.message);
        }
    };

    const cargarCamionParaEditar = (camion) => {
        setForm({
            marca: camion.marca,
            modelo: camion.modelo,
            capacidad: camion.capacidad,
            estado: camion.estado === 1 || camion.estado === true,
            fk_conductor: camion.fk_conductor || ""
        });
        setEditando(true);
        setIdEditar(camion.id_camion);
        setMostrarFormulario(true);
    };

    const cerrarFormulario = () => {
        setMostrarFormulario(false);
        setEditando(false);
        setIdEditar(null);
        setForm({ marca: "", modelo: "", capacidad: "", estado: true, fk_conductor: "" });
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>
                    <Truck size={32} color="#2563eb" />
                    Gestión de Camiones
                </h1>
                
                {puedeCrearYEditar && !mostrarFormulario && (
                    <button style={styles.btnCrear} onClick={() => setMostrarFormulario(true)}>
                        <Plus size={20} /> Nuevo Camión
                    </button>
                )}
            </div>

            {mostrarFormulario && (
                <div style={styles.formCard}>
                    <div style={styles.formHeader}>
                        <h2 style={styles.formTitle}>{editando ? "Editar Camión" : "Registrar Camión"}</h2>
                        <button onClick={cerrarFormulario} style={styles.btnClose}>
                            <X size={24} />
                        </button>
                    </div>
                    
                    <form onSubmit={handleSubmit} style={styles.formGrid}>
                        <div>
                            <label style={styles.label}>Marca</label>
                            <input type="text" style={styles.input} required
                                value={form.marca} onChange={(e) => setForm({ ...form, marca: e.target.value })} />
                        </div>
                        <div>
                            <label style={styles.label}>Modelo</label>
                            <input type="text" style={styles.input} required
                                value={form.modelo} onChange={(e) => setForm({ ...form, modelo: e.target.value })} />
                        </div>
                        <div>
                            <label style={styles.label}>Capacidad (Ton)</label>
                            <input type="number" step="0.01" style={styles.input} required
                                value={form.capacidad} onChange={(e) => setForm({ ...form, capacidad: e.target.value })} />
                        </div>
                        <div>
                            <label style={styles.label}>Conductor Asignado</label>
                            <select style={styles.input} required
                                value={form.fk_conductor} onChange={(e) => setForm({ ...form, fk_conductor: e.target.value })}>
                                <option value="">Seleccione conductor</option>
                                {conductores.map((c) => (
                                    <option key={c.id_conductor} value={c.id_conductor}>
                                        {c.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '25px' }}>
                            <input type="checkbox" id="estado" 
                                checked={form.estado} onChange={(e) => setForm({ ...form, estado: e.target.checked })}
                                style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
                            <label htmlFor="estado" style={{ marginLeft: '10px', cursor: 'pointer', fontWeight: '500' }}>
                                Camión Activo
                            </label>
                        </div>
                        
                        <div style={{ gridColumn: "1 / -1", display: "flex", gap: "10px", marginTop: "10px" }}>
                            <button type="submit" style={styles.btnGuardar}>
                                {editando ? "Actualizar Camión" : "Guardar Camión"}
                            </button>
                            <button type="button" onClick={cerrarFormulario} style={styles.btnCancelar}>
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div style={styles.tableContainer}>
                {loading ? (
                    <p style={{ padding: "20px", textAlign: "center", color: "#64748b" }}>Cargando camiones desde el servidor...</p>
                ) : (
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>ID</th>
                                <th style={styles.th}>Vehículo</th>
                                <th style={styles.th}>Capacidad</th>
                                <th style={styles.th}>Estado</th>
                                <th style={styles.th}>Conductor</th>
                                {(puedeCrearYEditar || puedeEliminar) && <th style={styles.th}>Acciones</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {camiones.map((camion) => (
                                <tr key={camion.id_camion} style={styles.tr}>
                                    <td style={styles.td}>#{camion.id_camion}</td>
                                    <td style={styles.td}>
                                        <strong>{camion.marca}</strong> <br />
                                        <span style={{ fontSize: "13px", color: "#64748b" }}>{camion.modelo}</span>
                                    </td>
                                    <td style={styles.td}>{camion.capacidad} Ton</td>
                                    <td style={styles.td}>
                                        <span style={{
                                            ...styles.badge,
                                            backgroundColor: camion.estado ? "#dcfce7" : "#fee2e2",
                                            color: camion.estado ? "#166534" : "#991b1b"
                                        }}>
                                            {camion.estado ? "Activo" : "Inactivo"}
                                        </span>
                                    </td>
                                    <td style={styles.td}>{camion.conductor || "Sin asignar"}</td>
                                    
                                    {(puedeCrearYEditar || puedeEliminar) && (
                                        <td style={styles.td}>
                                            <div style={styles.acciones}>
                                                {puedeCrearYEditar && (
                                                    <button style={styles.btnEditar} onClick={() => cargarCamionParaEditar(camion)}>
                                                        <Edit size={18} />
                                                    </button>
                                                )}
                                                {puedeEliminar && (
                                                    <button style={styles.btnEliminar} onClick={() => eliminarCamion(camion.id_camion)}>
                                                        <Trash2 size={18} />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))}
                            {camiones.length === 0 && (
                                <tr>
                                    <td colSpan="6" style={{ padding: "20px", textAlign: "center", color: "#64748b" }}>
                                        No hay camiones registrados o no se pudieron cargar.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

// Estilos
const styles = {
    container: { padding: "20px", backgroundColor: "#f8fafc", borderRadius: "12px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)", marginTop: "20px" },
    header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
    title: { display: "flex", alignItems: "center", gap: "10px", fontSize: "24px", color: "#1e293b", margin: 0 },
    btnCrear: { display: "flex", alignItems: "center", gap: "8px", backgroundColor: "#2563eb", color: "white", border: "none", padding: "10px 16px", borderRadius: "8px", fontWeight: "600", cursor: "pointer" },
    formCard: { backgroundColor: "white", padding: "20px", borderRadius: "8px", border: "1px solid #e2e8f0", marginBottom: "20px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" },
    formHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px", borderBottom: "1px solid #e2e8f0", paddingBottom: "10px" },
    formTitle: { margin: 0, fontSize: "18px", color: "#1e293b" },
    btnClose: { background: "none", border: "none", cursor: "pointer", color: "#64748b" },
    formGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "15px" },
    label: { display: "block", marginBottom: "5px", fontSize: "14px", fontWeight: "500", color: "#475569" },
    input: { width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "14px", boxSizing: "border-box" },
    btnGuardar: { backgroundColor: "#10b981", color: "white", border: "none", padding: "10px 20px", borderRadius: "6px", fontWeight: "600", cursor: "pointer" },
    btnCancelar: { backgroundColor: "#f1f5f9", color: "#475569", border: "none", padding: "10px 20px", borderRadius: "6px", fontWeight: "600", cursor: "pointer" },
    tableContainer: { overflowX: "auto", backgroundColor: "white", borderRadius: "8px", border: "1px solid #e2e8f0" },
    table: { width: "100%", borderCollapse: "collapse" },
    th: { backgroundColor: "#f1f5f9", padding: "12px 16px", textAlign: "left", fontSize: "14px", fontWeight: "600", color: "#475569", borderBottom: "2px solid #e2e8f0" },
    tr: { borderBottom: "1px solid #e2e8f0" },
    td: { padding: "12px 16px", fontSize: "15px", color: "#1e293b", verticalAlign: "middle" },
    badge: { padding: "4px 10px", borderRadius: "999px", fontSize: "13px", fontWeight: "600" },
    acciones: { display: "flex", gap: "10px" },
    btnEditar: { background: "none", border: "none", color: "#f59e0b", cursor: "pointer", padding: "5px" },
    btnEliminar: { background: "none", border: "none", color: "#ef4444", cursor: "pointer", padding: "5px" }
};

export default Camiones;