const facturaService = require("../services/facturaService");
const getFacturas = async (req, res) => {
    try {
        const data = await facturaService.obtenerFacturas();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const postFactura = async (req, res) => {
    try {
        const result = await facturaService.crearFactura(req.body);
        res.status(201).json({
            message: "Factura creada",
            id: result.insertId        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports = {getFacturas, postFactura};