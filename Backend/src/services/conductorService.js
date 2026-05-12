const db = require("../config/db");
const obtenerConductores = async () => {
    const [rows] = await db.query("SELECT * FROM conductores");
    return rows;
};
const crearConductor = async (conductor) => {
    const { nombre, telefono, licencia_nro, licencia_vence, fk_usuario } = conductor;
    if (!nombre || !telefono) {
        throw new Error("Nombre y Teléfono son obligatorios");
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
        fk_usuario
    ]);
    return result;
};
const actualizarConductor = async (id, conductor) => {
    const { nombre, telefono, licencia_nro, licencia_vence, fk_usuario } = conductor;
    if (!nombre || !telefono) {
        throw new Error("Nombre y Teléfono son obligatorios");
    }
    const fechaVence = licencia_vence ? licencia_vence : null;
    const idUsuario = fk_usuario ? fk_usuario : null;
    const sql = `
        UPDATE conductores 
        SET nombre = ?, telefono = ?, licencia_nro = ?, licencia_vence = ?, fk_usuario = ? 
        WHERE id_conductor = ?
    `;
    const [result] = await db.execute(sql, [nombre, telefono, licencia_nro, fechaVence, idUsuario, id]);
    if (result.affectedRows === 0) {
        throw new Error("Conductor no encontrado");
    }
    return result;
};
const eliminarConductor = async (id) => {
    try {
        const sql = "DELETE FROM conductores WHERE id_conductor = ?";
        const [result] = await db.execute(sql, [id]);
        if (result.affectedRows === 0) {
            throw new Error("Conductor no encontrado");
        }
        return result;
    } catch (error) {
        if (error.code === 'ER_ROW_IS_REFERENCED_2') {
            throw new Error("No se puede eliminar este conductor porque ya tiene camiones, viajes o facturas asignados.");
        }
        throw error;
    }
};
module.exports = {
    obtenerConductores,
    crearConductor,
    actualizarConductor,
    eliminarConductor
};