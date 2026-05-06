const db = require("../config/db");
const obtenerFacturas = async () => {
    const [rows] = await db.query("SELECT * FROM facturas");
    return rows;
};
const crearFactura = async (factura) => {
    const { fk_conductor, nombre_conductor,  basico, fecha_factura } = factura;
    const sql = `
        insert into facturas
        values(null, ?, ?, ?, ?);
    `;
    const [result] = await db.execute(sql, [
        fk_conductor,
        nombre_conductor,
        basico,
        fecha_factura,]);
    return result;
};
module.exports = {
    obtenerFacturas,
    crearFactura
};