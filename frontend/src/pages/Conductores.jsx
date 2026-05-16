import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Users, X, Calendar, Phone, CreditCard, UserCheck, AlertTriangle } from "lucide-react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Conductores() {
    const [conductores, setConductores] = useState([]);
    const [usuariosList, setUsuariosList] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [editando, setEditando] = useState(false);
    const [idEditar, setIdEditar] = useState(null);

    const [form, setForm] = useState({
        nombre: "",
        telefono: "",
        licencia_nro: "",
        licencia_vence: "",
        fk_usuario: "" 
    });

    const navigate = useNavigate();

    const usuarioData = localStorage.getItem("usuario");
    const token = localStorage.getItem("token");
    const usuarioLogueado = usuarioData ? JSON.parse(usuarioData) : null;
    const rolActual = usuarioLogueado?.rol;

    const esAdmin = rolActual === "Administrador";
    const esCoAdmin = rolActual === "co_administrador"; 

    const puedeCrearYEditar = esAdmin || esCoAdmin;
    const puedeEliminar = esAdmin;

    const API_BASE = "https://proyectweb-1t6d.onrender.com/api/v1";

    const fetchHeaders = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };

    // Función para verificar si la licencia está vencida
    const esLicenciaVencida = (fecha) => {
        if (!fecha) return false;
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        return new Date(fecha) < hoy;
    };

    useEffect(() => {
        if (!token) {
            toast.error("No tienes autorización. Inicia sesión.");
            navigate("/login");
            return;
        }
        cargarDatos();
        cargarUsuarios();
    }, []);

    const cargarDatos = async () => {
        try {
            const res = await fetch(`${API_BASE}/conductores`, { headers: fetchHeaders });
            const data = await res.json();
            let lista = Array.isArray(data) ? data : [];
            lista.sort((a, b) => a.id_conductor - b.id_conductor);
            setConductores(lista);
            setLoading(false);
        } catch (error) {
            toast.error("Error al cargar conductores");
            setLoading(false);
        }
    };

    const cargarUsuarios = async () => {
        try {
            const res = await fetch(`${API_BASE}/usuarios`, { headers: fetchHeaders });
            const data = await res.json();
            
            // ESPÍA 1: Ver qué recibe exactamente React
            console.log("DATOS RECIBIDOS DEL FETCH:", data);

            if (Array.isArray(data)) {
                setUsuariosList(data);
                console.log("SE GUARDARON EN EL ESTADO");
            } else {
                console.log("LOS DATOS NO SON UN ARREGLO", data);
            }
        } catch (error) {
            console.error("Error cargando usuarios:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const payload = {
            ...form,
            fk_usuario: form.fk_usuario === "" ? null : parseInt(form.fk_usuario)
        };

        const url = editando ? `${API_BASE}/conductor/${idEditar}` : `${API_BASE}/conductor`;
        const metodo = editando ? "PUT" : "POST";

        try {
            const res = await fetch(url, {
                method: metodo,
                headers: fetchHeaders,
                body: JSON.stringify(payload),
            });
            
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Error al guardar");

            toast.success(editando ? "Conductor actualizado" : "Conductor registrado");
            cargarDatos();
            cerrarFormulario();
        } catch (error) {
            toast.error(error.message);
        }
    };

    const eliminarConductor = async (id) => {
        if (!window.confirm("¿Seguro que quieres eliminar este conductor?")) return;
        try {
            const res = await fetch(`${API_BASE}/conductor/${id}`, { 
                method: "DELETE",
                headers: fetchHeaders
            });
            if (!res.ok) throw new Error("No se pudo eliminar");
            toast.success("Conductor eliminado");
            setConductores(conductores.filter(c => c.id_conductor !== id));
        } catch (error) {
            toast.error(error.message);
        }
    };

    const cargarParaEditar = (c) => {
        setForm({
            nombre: c.nombre,
            telefono: c.telefono,
            licencia_nro: c.licencia_nro,
            licencia_vence: c.licencia_vence ? c.licencia_vence.split('T')[0] : "",
            fk_usuario: c.fk_usuario || ""
        });
        setEditando(true);
        setIdEditar(c.id_conductor);
        setMostrarFormulario(true);
    };

    const cerrarFormulario = () => {
        setMostrarFormulario(false);
        setEditando(false);
        setForm({ nombre: "", telefono: "", licencia_nro: "", licencia_vence: "", fk_usuario: "" });
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}><Users size={32} color="#2563eb" /> Gestión de Conductores</h1>
                {puedeCrearYEditar && !mostrarFormulario && (
                    <button style={styles.btnCrear} onClick={() => setMostrarFormulario(true)}>
                        <Plus size={20} /> Nuevo Conductor
                    </button>
                )}
            </div>

            {mostrarFormulario && (
                <div style={styles.formCard}>
                    <div style={styles.formHeader}>
                        <h2 style={styles.formTitle}>{editando ? "Editar Datos" : "Nuevo Registro"}</h2>
                        <button onClick={cerrarFormulario} style={styles.btnClose}><X size={24} /></button>
                    </div>
                    <form onSubmit={handleSubmit} style={styles.formGrid}>
                        <div>
                            <label style={styles.label}>Nombre Completo</label>
                            <input type="text" style={styles.input} required
                                value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
                        </div>
                        <div>
                            <label style={styles.label}>Teléfono</label>
                            <input type="text" style={styles.input} required
                                value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} />
                        </div>
                        <div>
                            <label style={styles.label}>Nº Licencia</label>
                            <input type="text" style={styles.input} required
                                value={form.licencia_nro} onChange={(e) => setForm({ ...form, licencia_nro: e.target.value })} />
                        </div>
                        <div>
                            <label style={styles.label}>Vencimiento Licencia</label>
                            <input type="date" style={styles.input} required
                                value={form.licencia_vence} onChange={(e) => setForm({ ...form, licencia_vence: e.target.value })} />
                        </div>

                        <div>
                            <label style={styles.label}>Usuario Vinculado (Email)</label>
                            <select 
                                style={styles.input}
                                value={form.fk_usuario}
                                onChange={(e) => setForm({ ...form, fk_usuario: e.target.value })}
                            >
                                <option value="">-- Sin usuario asignado --</option>
                                {usuariosList.map(u => (
                                    <option key={u.id_usuario} value={u.id_usuario}>
                                        {u.nombre_usuario} (ID: {u.id_usuario})
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        <div style={{ gridColumn: "1 / -1", display: "flex", gap: "10px", marginTop: "15px" }}>
                            <button type="submit" style={styles.btnGuardar}>Guardar</button>
                            <button type="button" onClick={cerrarFormulario} style={styles.btnCancelar}>Cancelar</button>
                        </div>
                    </form>
                </div>
            )}

            <div style={styles.tableContainer}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>ID</th>
                            <th style={styles.th}>Nombre</th>
                            <th style={styles.th}>Contacto</th>
                            <th style={styles.th}>Licencia</th>
                            <th style={styles.th}>Vence</th>
                            <th style={styles.th}>User ID</th>
                            {(puedeCrearYEditar || puedeEliminar) && <th style={styles.th}>Acciones</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {conductores.map((c) => {
                            const vencida = esLicenciaVencida(c.licencia_vence);
                            return (
                                <tr key={c.id_conductor} style={styles.tr}>
                                    <td style={styles.td}>#{c.id_conductor}</td>
                                    <td style={styles.td}><strong>{c.nombre}</strong></td>
                                    <td style={styles.td}><div style={{display:'flex', alignItems:'center', gap: '5px'}}><Phone size={14}/> {c.telefono}</div></td>
                                    <td style={styles.td}><div style={{display:'flex', alignItems:'center', gap: '5px'}}><CreditCard size={14}/> {c.licencia_nro}</div></td>
                                    <td style={{...styles.td, color: vencida ? '#ef4444' : 'inherit'}}>
                                        <div style={{display:'flex', alignItems:'center', gap: '5px', fontWeight: vencida ? '600' : 'normal'}}>
                                            <Calendar size={14}/> 
                                            {c.licencia_vence ? new Date(c.licencia_vence).toLocaleDateString() : 'N/A'}
                                            {vencida && <AlertTriangle size={14} title="Licencia Vencida" />}
                                        </div>
                                    </td>
                                    <td style={styles.td}>
                                        <div style={{display:'flex', alignItems:'center', gap: '5px'}}>
                                            <UserCheck size={14}/> {c.fk_usuario || 'Ninguno'}
                                        </div>
                                    </td>
                                    <td style={styles.td}>
                                        <div style={styles.acciones}>
                                            {puedeCrearYEditar && <button style={styles.btnEditar} onClick={() => cargarParaEditar(c)} title="Editar"><Edit size={18}/></button>}
                                            {puedeEliminar && <button style={styles.btnEliminar} onClick={() => eliminarConductor(c.id_conductor)} title="Eliminar"><Trash2 size={18}/></button>}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const styles = {
    container: { padding: "20px", backgroundColor: "#f8fafc", borderRadius: "12px", marginTop: "20px" },
    header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
    title: { display: "flex", alignItems: "center", gap: "10px", fontSize: "24px", color: "#1e293b", margin: 0 },
    btnCrear: { display: "flex", alignItems: "center", gap: "8px", backgroundColor: "#2563eb", color: "white", border: "none", padding: "10px 16px", borderRadius: "8px", cursor: "pointer", fontWeight: "600" },
    formCard: { backgroundColor: "white", padding: "20px", borderRadius: "8px", border: "1px solid #e2e8f0", marginBottom: "20px" },
    formHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" },
    formTitle: { margin: 0, fontSize: "18px" },
    btnClose: { background: "none", border: "none", cursor: "pointer", color: "#64748b" },
    formGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "15px" },
    label: { display: "block", marginBottom: "5px", fontSize: "14px", fontWeight: "500" },
    input: { width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1", boxSizing: "border-box" },
    btnGuardar: { backgroundColor: "#10b981", color: "white", border: "none", padding: "10px 20px", borderRadius: "6px", cursor: "pointer", fontWeight: "600" },
    btnCancelar: { backgroundColor: "#f1f5f9", color: "#475569", border: "none", padding: "10px 20px", borderRadius: "6px", cursor: "pointer" },
    tableContainer: { overflowX: "auto", backgroundColor: "white", borderRadius: "8px", border: "1px solid #e2e8f0" },
    table: { width: "100%", borderCollapse: "collapse" },
    th: { backgroundColor: "#f1f5f9", padding: "12px", textAlign: "left", fontSize: "14px", color: "#475569" },
    tr: { borderBottom: "1px solid #e2e8f0" },
    td: { padding: "12px", fontSize: "14px" },
    acciones: { display: "flex", gap: "10px" },
    btnEditar: { background: "none", border: "none", color: "#f59e0b", cursor: "pointer" },
    btnEliminar: { background: "none", border: "none", color: "#ef4444", cursor: "pointer" }
};

export default Conductores;