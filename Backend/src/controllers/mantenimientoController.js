const mantenimientoService = require("../services/mantenimientoService");
const getMantenimientos = async (req, res) => {
    try {
        const data = await mantenimientoService.obtenerMantenimientos();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const postMantenimiento = async (req, res) => {
    try {
        const result = await mantenimientoService.crearMantenimiento(req.body);
        res.status(201).json({
            message: "Mantenimiento creado",
            id: result.insertId
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const updateMantenimiento = async (req, res) => {
    try {
        const { id } = req.params;
        await mantenimientoService.actualizarMantenimiento(id, req.body);
        res.json({ message: "Mantenimiento actualizado" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const deleteMantenimiento = async (req, res) => {
    try {
        const { id } = req.params;
        await mantenimientoService.eliminarMantenimiento(id);
        res.json({ message: "Mantenimiento eliminado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports = {
    getMantenimientos,
    postMantenimiento,
    updateMantenimiento,
    deleteMantenimiento
};