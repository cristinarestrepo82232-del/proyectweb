const viajeService = require("../services/viajeService");
const getViajes = async (req, res) => {
    try {
        const data = await viajeService.obtenerViajes();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const postViaje = async (req, res) => {
    try {
        const result = await viajeService.crearViaje(req.body);
        res.status(201).json({
            message: "Viaje creado",
            id: result.insertId        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports = {getViajes,postViaje};