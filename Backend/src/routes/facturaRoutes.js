const express = require("express");
const router = express.Router();
const facturas = require("../controllers/facturaController");
const { verificarToken, autorizarRoles } = require('../middleware/authMiddleware');

router.get("/facturas", verificarToken, facturas.getFacturas);
router.post("/factura", verificarToken, autorizarRoles('Administrador', 'co_administrador'), facturas.postFactura);
router.put("/factura/:id", verificarToken, autorizarRoles('Administrador', 'co_administrador'), facturas.updateFactura);
router.delete("/factura/:id", verificarToken, autorizarRoles('Administrador'), facturas.deleteFactura);

module.exports = router;