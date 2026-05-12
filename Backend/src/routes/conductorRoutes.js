const express = require("express");
const router = express.Router();
const conductores = require("../controllers/conductorController");
const { verificarToken, autorizarRoles } = require('../middleware/authMiddleware');

router.get("/conductores", verificarToken, conductores.getConductores);
router.post("/conductor", verificarToken, autorizarRoles('Administrador', 'co_administrador'), conductores.postConductor);
router.put("/conductor/:id", verificarToken, autorizarRoles('Administrador', 'co_administrador'), conductores.updateConductor);
router.delete("/conductor/:id", verificarToken, autorizarRoles('Administrador'), conductores.deleteConductor);

module.exports = router;