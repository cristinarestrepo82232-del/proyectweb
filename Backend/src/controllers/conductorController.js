const conductorService = require("../services/conductorService");
const getConductores = async (req, res) => {
    try {
        const data = await conductorService.obtenerConductores();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const postConductor = async (req, res) => {
    try {
        const result = await conductorService.crearConductor(req.body);
        res.status(201).json({
            message: "Conductor creado",
            id: result.insertId
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const updateConductor = async (req, res) => {
    try {
        const { id } = req.params;
        await conductorService.actualizarConductor(id, req.body);
        res.json({ message: "Conductor actualizado" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const deleteConductor = async (req, res) => {
    try {
        const { id } = req.params;
        await conductorService.eliminarConductor(id);
        res.json({ message: "Conductor eliminado" });
    } catch (error) {
        if (error.message.includes("No se puede eliminar")) {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
};
module.exports = {
    getConductores,
    postConductor,
    updateConductor,
    deleteConductor
};