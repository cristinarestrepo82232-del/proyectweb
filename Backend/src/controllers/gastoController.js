const gastoService = require("../services/gastoService");
const getGastos = async (req, res) => {
    try {
        const data = await gastoService.obtenerGastos();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const postGasto = async (req, res) => {
    try {
        const result = await gastoService.crearGasto(req.body);
        res.status(201).json({
            message: "Gasto creado",
            id: result.insertId        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports = {getGastos,postGasto};