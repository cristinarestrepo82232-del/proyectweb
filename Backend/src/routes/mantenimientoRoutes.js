const express = require("express");
const router = express.Router();
const mantenimientos = require("../controllers/mantenimientoController");
router.get("/mantenimientos", mantenimientos.getMantenimientos);
router.post("/mantenimiento", mantenimientos.postMantenimiento);
module.exports = router;