const express = require("express");
const router = express.Router();
const conductores = require("../controllers/conductorController");
router.get("/conductores", conductores.getConductores);
router.post("/conductor", conductores.postConductor);
module.exports = router;