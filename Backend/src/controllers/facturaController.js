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
            id: result.insertId
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const updateFactura = async (req, res) => {
    try {
        const { id } = req.params;
        await facturaService.actualizarFactura(id, req.body);
        res.json({ message: "Factura actualizada" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const deleteFactura = async (req, res) => {
    try {
        const { id } = req.params;
        await facturaService.eliminarFactura(id);
        res.json({ message: "Factura eliminada" });
    } catch (error) {
        if (error.message.includes("No se puede eliminar")) {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
};
module.exports = {
    getFacturas, 
    postFactura,
    updateFactura,
    deleteFactura
};