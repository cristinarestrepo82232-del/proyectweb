const db = require("../config/db");
const obtenerViajes = async () => {
    const [rows] = await db.query(`
        SELECT 
            v.*, 
            c.marca AS camion_marca, 
            con.nombre AS conductor_nombre
        FROM viajes v
        INNER JOIN camiones c ON v.fk_camion = c.id_camion
        INNER JOIN conductores con ON v.fk_conductor = con.id_conductor
    `);
    return rows;
};
const crearViaje = async (viaje) => {
    const { fk_camion, fk_conductor, fecha_salida, fecha_llegada, producto_carga, origen, destino, valor_flete } = viaje;
    if (valor_flete < 0) {
        throw new Error("El valor del flete no puede ser negativo");
    }
    const dSalida = new Date(fecha_salida);
    const dLlegada = new Date(fecha_llegada);
    if (dLlegada < dSalida) {
        throw new Error("La fecha de llegada no puede ser anterior a la de salida");
    }
    const sql = `
        INSERT INTO viajes 
        (fk_camion, fk_conductor, fecha_salida, fecha_llegada, producto_carga, origen, destino, valor_flete)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    `;
    const [result] = await db.execute(sql, [
        fk_camion, 
        fk_conductor, 
        fecha_salida, 
        fecha_llegada, 
        producto_carga, 
        origen, 
        destino, 
        valor_flete]);
    return result;
};
module.exports = {
    obtenerViajes,
    crearViaje
};