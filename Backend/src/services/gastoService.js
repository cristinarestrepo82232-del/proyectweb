const db = require("../config/db");
const obtenerGastos = async () => {
    const [rows] = await db.query("SELECT * FROM gastos");
    return rows;
};
const crearGasto = async (gasto) => {
    const { fk_viaje, tipo_gasto, monto } = gasto;
    const sql = `
        INSERT INTO gastos
        VALUES(null, ?, ?, ?);
    `;
    const [result] = await db.execute(sql, [
        fk_viaje, 
        tipo_gasto, 
        monto]);
    return result;
};
module.exports = {
    obtenerGastos,
    crearGasto
};