const express = require("express");
const router = express.Router();
const mantenimientos = require("../controllers/mantenimientoController");
const { verificarToken, autorizarRoles } = require('../middleware/authMiddleware');

router.get("/mantenimientos", verificarToken, mantenimientos.getMantenimientos);
router.post("/mantenimiento", verificarToken, autorizarRoles('Administrador', 'co_administrador'), mantenimientos.postMantenimiento);
router.put("/mantenimiento/:id", verificarToken, autorizarRoles('Administrador', 'co_administrador'), mantenimientos.updateMantenimiento);
router.delete("/mantenimiento/:id", verificarToken, autorizarRoles('Administrador'), mantenimientos.deleteMantenimiento);

module.exports = router;