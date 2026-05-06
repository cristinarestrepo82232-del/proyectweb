const db = require("../config/db");
const obtenerCamiones = async () => {
    const [rows] = await db.query(`
        SELECT 
            c.id_camion, 
            c.marca, 
            c.modelo, 
            c.capacidad, 
            c.estado, 
            c.fk_conductor,
            con.nombre AS conductor 
        FROM camiones c 
        INNER JOIN conductores con 
        ON c.fk_conductor = con.id_conductor
    `);
    return rows;
};
const crearCamion = async (camion) => {
    const { marca, modelo, capacidad, estado, fk_conductor } = camion;
    if (capacidad < 0) {
        throw new Error("Capacidad inválida");
    }
    if (fk_conductor <= 0) {
        throw new Error("Conductor inválido");
    }
    const [conductor] = await db.query(
        "SELECT * FROM conductores WHERE id_conductor = ?",
        [fk_conductor]
    );
    if (conductor.length === 0) {
        throw new Error("El conductor no existe");
    }
    const sql = `
        INSERT INTO camiones (marca, modelo, capacidad, estado, fk_conductor)
        VALUES (?, ?, ?, ?, ?);
    `;
    const [result] = await db.execute(sql, [
        marca,
        modelo,
        capacidad,
        estado,
        fk_conductor
    ]);
    return result;
};
const eliminarCamion = async (id) => {
    const sql = "DELETE FROM camiones WHERE id_camion = ?";
    const [result] = await db.execute(sql, [id]);
    if (result.affectedRows === 0) {
    throw new Error("Camión no encontrado");
    }
    return result;
};
const actualizarCamion = async (id, camion) => {
    const { marca, modelo, capacidad, estado, fk_conductor } = camion;
    if (capacidad < 0) {
        throw new Error("Capacidad inválida");
    }
    const [conductor] = await db.query(
        "SELECT * FROM conductores WHERE id_conductor = ?",
        [fk_conductor]
    );
    if (conductor.length === 0) {
        throw new Error("El conductor no existe");
    }
    const sql = `
        UPDATE camiones
        SET marca = ?, modelo = ?, capacidad = ?, estado = ?, fk_conductor = ?
        WHERE id_camion = ?
    `;
    const [result] = await db.execute(sql, [
        marca,
        modelo,
        capacidad,
        estado,
        fk_conductor,
        id
    ]);
    if (result.affectedRows === 0) {
        throw new Error("Camión no encontrado");
    }
    return result;
};

module.exports = {
    obtenerCamiones,
    crearCamion,
    eliminarCamion,
    actualizarCamion
};