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
            id: result.insertId        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports = {getConductores,postConductor};