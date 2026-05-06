const express = require("express");
const router = express.Router();
const facturas = require("../controllers/facturaController");
router.get("/facturas", facturas.getFacturas);
router.post("/factura", facturas.postFactura);
module.exports = router;