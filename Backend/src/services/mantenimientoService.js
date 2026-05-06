const db = require("../config/db");
const obtenerMantenimientos = async () => {
    const [rows] = await db.query("SELECT * FROM mantenimientos");
    return rows;
};
const crearMantenimiento = async (mantenimiento) => {
    const { fk_camion, descripcion, costo_total, fecha_mantenimiento } = mantenimiento;
    const sql = `
        insert into mantenimientos
        values(null, ?, ?, ?, ?);
    `;
    const [result] = await db.execute(sql, [
        fk_camion, 
        descripcion, 
        costo_total, 
        fecha_mantenimiento]);
    return result;
};
module.exports = {
    obtenerMantenimientos,
    crearMantenimiento
};