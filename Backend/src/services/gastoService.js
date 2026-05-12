const db = require("../config/db");
const obtenerGastos = async () => {
    const [rows] = await db.query("SELECT * FROM gastos");
    return rows;
};
const crearGasto = async (gasto) => {
    const { fk_viaje, tipo_gasto, monto } = gasto;
    if (!fk_viaje || !tipo_gasto || monto === undefined) {
        throw new Error("El viaje, el tipo de gasto y el monto son obligatorios");
    }
    const sql = `
        INSERT INTO gastos (fk_viaje, tipo_gasto, monto)
        VALUES(?, ?, ?);
    `;
    const [result] = await db.execute(sql, [
        fk_viaje, 
        tipo_gasto, 
        monto
    ]);
    return result;
};
const actualizarGasto = async (id, gasto) => {
    const { fk_viaje, tipo_gasto, monto } = gasto;
    if (!fk_viaje || !tipo_gasto || monto === undefined) {
        throw new Error("El viaje, el tipo de gasto y el monto son obligatorios");
    }
    const sql = `
        UPDATE gastos 
        SET fk_viaje = ?, tipo_gasto = ?, monto = ?
        WHERE id_gastos = ?
    `;
    const [result] = await db.execute(sql, [
        fk_viaje,
        tipo_gasto,
        monto,
        id
    ]);
    if (result.affectedRows === 0) {
        throw new Error("Gasto no encontrado");
    }
    return result;
};
const eliminarGasto = async (id) => {
    const sql = "DELETE FROM gastos WHERE id_gastos = ?";
    const [result] = await db.execute(sql, [id]);
    if (result.affectedRows === 0) {
        throw new Error("Gasto no encontrado");
    }
    return result;
};
module.exports = {
    obtenerGastos,
    crearGasto,
    actualizarGasto,
    eliminarGasto
};