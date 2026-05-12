const express = require("express");
const router = express.Router();
const gastos = require("../controllers/gastoController");
const { verificarToken, autorizarRoles } = require('../middleware/authMiddleware');

router.get("/gastos", verificarToken, gastos.getGastos);
router.post("/gasto", verificarToken, autorizarRoles('Administrador', 'co_administrador'), gastos.postGasto);
router.put("/gasto/:id", verificarToken, autorizarRoles('Administrador', 'co_administrador'), gastos.updateGasto);
router.delete("/gasto/:id", verificarToken, autorizarRoles('Administrador'), gastos.deleteGasto);

module.exports = router;