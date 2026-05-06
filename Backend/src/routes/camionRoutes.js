const express = require("express");
const router = express.Router();
const camiones = require("../controllers/camionController");
router.get("/camiones", camiones.getCamiones);
router.post("/camion", camiones.postCamion);
router.delete("/camion/:id", camiones.deleteCamion);
router.put("/camion/:id", camiones.updateCamion);
module.exports = router;