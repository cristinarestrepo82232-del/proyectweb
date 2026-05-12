const express = require("express");
const router = express.Router();
const viajes = require("../controllers/viajeController");
const { verificarToken, autorizarRoles } = require('../middleware/authMiddleware');

router.get("/viajes", verificarToken, viajes.getViajes);
router.post("/viajes", verificarToken, autorizarRoles('Administrador', 'co_administrador'), viajes.postViaje);
router.put("/viajes/:id", verificarToken, autorizarRoles('Administrador', 'co_administrador'), viajes.updateViaje);
router.delete("/viajes/:id", verificarToken, autorizarRoles('Administrador'), viajes.deleteViaje);

module.exports = router;