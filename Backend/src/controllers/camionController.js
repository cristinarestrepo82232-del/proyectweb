const camionService = require("../services/camionService");
const getCamiones = async (req, res) => {
    try {
        const data = await camionService.obtenerCamiones();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const postCamion = async (req, res) => {
    try {
        const result = await camionService.crearCamion(req.body);
        res.status(201).json({
            message: "Camión creado",
            id: result.insertId
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const deleteCamion = async (req, res) => {
    try {
    const { id } = req.params;
    const result = await camionService.eliminarCamion(id);
    res.json({ message: "Camión eliminado" });
    } catch (error) {
    res.status(500).json({ error: error.message });
    }
};
const updateCamion = async (req, res) => {
    try {
    const { id } = req.params;
    await camionService.actualizarCamion(id, req.body);
    res.json({ message: "Camión actualizado" });
    } catch (error) {
    res.status(400).json({ error: error.message });
    }
};
module.exports = {
    getCamiones,
    postCamion,
    deleteCamion,
    updateCamion
};