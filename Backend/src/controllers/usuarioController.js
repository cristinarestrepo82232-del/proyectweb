const pool = require('../config/db'); // Ajusta esta ruta según dónde tengas tu conexión a la base de datos

const getUsuarios = async (req, res, next) => {
    try {
        // Traemos el ID y el email. Le ponemos el alias 'nombre_usuario' para que React lo lea
        const [usuarios] = await pool.query('SELECT id_usuario, email AS nombre_usuario FROM usuarios WHERE fk_rol = 3');
        
        res.status(200).json(usuarios);
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        res.status(500).json({ error: "Error al obtener la lista de usuarios" });
    }
};

module.exports = {
    getUsuarios
};