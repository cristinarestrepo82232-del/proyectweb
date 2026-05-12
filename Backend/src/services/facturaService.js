const db = require("../config/db");
const obtenerFacturas = async () => {
    // Si más adelante quieres traer los detalles de la factura, puedes hacer un JOIN aquí
    const [rows] = await db.query("SELECT * FROM facturas");
    return rows;
};
const crearFactura = async (factura) => {
    const { fk_conductor, nombre_conductor, basico, fecha_factura } = factura;
    if (!fk_conductor || !basico) {
        throw new Error("El conductor y el sueldo básico son obligatorios");
    }
    const sql = `
        INSERT INTO facturas (fk_conductor, nombre_conductor, basico, fecha_factura)
        VALUES (?, ?, ?, ?);
    `;
    const [result] = await db.execute(sql, [
        fk_conductor,
        nombre_conductor,
        basico,
        fecha_factura || new Date().toISOString().split('T')[0] // Si no mandan fecha, pone la de hoy
    ]);
    return result;
};
const actualizarFactura = async (id, factura) => {
    const { fk_conductor, nombre_conductor, basico, fecha_factura } = factura;
    if (!fk_conductor || !basico) {
        throw new Error("El conductor y el sueldo básico son obligatorios");
    }
    const sql = `
        UPDATE facturas 
        SET fk_conductor = ?, nombre_conductor = ?, basico = ?, fecha_factura = ?
        WHERE id_factura = ?
    `;
    const [result] = await db.execute(sql, [
        fk_conductor,
        nombre_conductor,
        basico,
        fecha_factura,
        id
    ]);
    if (result.affectedRows === 0) {
        throw new Error("Factura no encontrada");
    }
    return result;
};
const eliminarFactura = async (id) => {
    try {
        const sql = "DELETE FROM facturas WHERE id_factura = ?";
        const [result] = await db.execute(sql, [id]);
        if (result.affectedRows === 0) {
            throw new Error("Factura no encontrada");
        }
        return result;
    } catch (error) {
        // Manejo del error si la factura ya tiene registros en la tabla 'detalles'
        if (error.code === 'ER_ROW_IS_REFERENCED_2') {
            throw new Error("No se puede eliminar esta factura porque ya tiene detalles de pago asociados.");
        }
        throw error;
    }
};
module.exports = {
    obtenerFacturas,
    crearFactura,
    actualizarFactura,
    eliminarFactura
};