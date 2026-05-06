const express = require("express");
const router = express.Router();
const viajes = require("../controllers/viajeController");
router.get("/viajes", viajes.getViajes);
router.post("/viajes", viajes.postViaje);
module.exports = router;