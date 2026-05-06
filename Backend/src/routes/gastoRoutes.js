const express = require("express");
const router = express.Router();
const gastos = require("../controllers/gastoController");
router.get("/gastos", gastos.getGastos);
router.post("/gasto", gastos.postGasto);
module.exports = router;