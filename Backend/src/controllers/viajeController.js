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
            id: result.insertId
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const updateViaje = async (req, res) => {
    try {
        const { id } = req.params;
        await viajeService.actualizarViaje(id, req.body);
        res.json({ message: "Viaje actualizado" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const deleteViaje = async (req, res) => {
    try {
        const { id } = req.params;
        await viajeService.eliminarViaje(id);
        res.json({ message: "Viaje eliminado" });
    } catch (error) {
        if (error.message.includes("No se puede eliminar")) {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
};
module.exports = {
    getViajes,
    postViaje,
    updateViaje,
    deleteViaje
};