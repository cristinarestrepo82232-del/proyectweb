const express = require("express");
const router = express.Router();
const camiones = require("../controllers/camionController");
const { verificarToken, autorizarRoles } = require('../middleware/authMiddleware');

router.get("/camiones", verificarToken, camiones.getCamiones);
router.post("/camion", verificarToken, autorizarRoles('Administrador', 'co_administrador'), camiones.postCamion);
router.put("/camion/:id", verificarToken, autorizarRoles('Administrador', 'co_administrador'), camiones.updateCamion);
router.delete("/camion/:id", verificarToken, autorizarRoles('Administrador'), camiones.deleteCamion);

module.exports = router;