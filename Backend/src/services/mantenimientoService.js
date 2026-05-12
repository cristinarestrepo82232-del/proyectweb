const db = require("../config/db");
const obtenerMantenimientos = async () => {
    const [rows] = await db.query("SELECT * FROM mantenimientos");
    return rows;
};
const crearMantenimiento = async (mantenimiento) => {
    const { fk_camion, descripcion, costo_total, fecha_mantenimiento } = mantenimiento;
    if (!fk_camion || !descripcion || costo_total === undefined) {
        throw new Error("El camión, la descripción y el costo total son obligatorios");
    }
    const sql = `
        INSERT INTO mantenimientos (fk_camion, descripcion, costo_total, fecha_mantenimiento)
        VALUES(?, ?, ?, ?);
    `;
    const [result] = await db.execute(sql, [
        fk_camion, 
        descripcion, 
        costo_total,
        fecha_mantenimiento || new Date().toISOString().split('T')[0] 
    ]);
    return result;
};
const actualizarMantenimiento = async (id, mantenimiento) => {
    const { fk_camion, descripcion, costo_total, fecha_mantenimiento } = mantenimiento;
    if (!fk_camion || !descripcion || costo_total === undefined) {
        throw new Error("El camión, la descripción y el costo total son obligatorios");
    }
    const sql = `
        UPDATE mantenimientos 
        SET fk_camion = ?, descripcion = ?, costo_total = ?, fecha_mantenimiento = ?
        WHERE id_mantenimiento = ?
    `;
    const [result] = await db.execute(sql, [
        fk_camion,
        descripcion,
        costo_total,
        fecha_mantenimiento,
        id
    ]);
    if (result.affectedRows === 0) {
        throw new Error("Mantenimiento no encontrado");
    }
    return result;
};
const eliminarMantenimiento = async (id) => {
    const sql = "DELETE FROM mantenimientos WHERE id_mantenimiento = ?";
    const [result] = await db.execute(sql, [id]);
    if (result.affectedRows === 0) {
        throw new Error("Mantenimiento no encontrado");
    }
    return result;
};
module.exports = {
    obtenerMantenimientos,
    crearMantenimiento,
    actualizarMantenimiento,
    eliminarMantenimiento
};