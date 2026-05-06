const db = require("../config/db");
const obtenerConductores = async () => {
    const [rows] = await db.query("SELECT * FROM conductores");
    return rows;
};
const crearConductor = async (conductor) => {
    const { nombre, telefono, licencia_nro, licencia_vence, fk_usuario } = conductor;
    if (!nombre || !telefono) {
        throw new Error("Nombre y Telefono son obligatorios");
    }
    const sql = `
        INSERT INTO conductores (nombre, telefono, licencia_nro, licencia_vence, fk_usuario) 
        VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await db.query(sql, [
        nombre, 
        telefono, 
        licencia_nro, 
        licencia_vence, 
        fk_usuario]);
    return result;
};
const actualizarConductor = async (id, conductor) => {
    const { nombre, telefono, licencia_nro, licencia_vence, fk_usuario } = conductor;
    
    const fechaVence = licencia_vence ? licencia_vence : null;
    const idUsuario = fk_usuario ? fk_usuario : null;

    const sql = `
        UPDATE conductores 
        SET nombre = ?, telefono = ?, licencia_nro = ?, licencia_vence = ?, fk_usuario = ? 
        WHERE id_conductor = ?
    `;
    
    const [result] = await db.execute(sql, [nombre, telefono, licencia_nro, fechaVence, idUsuario, id]);
    return result;
};
const eliminarConductor = async (id) => {
    // OJO: MySQL lanzará error si el conductor tiene viajes asignados (Integridad Referencial)
    const sql = "DELETE FROM conductores WHERE id_conductor = ?";
    const [result] = await db.execute(sql, [id]);
    return result;
};
module.exports = {
    obtenerConductores,
    crearConductor,
    eliminarConductor
};