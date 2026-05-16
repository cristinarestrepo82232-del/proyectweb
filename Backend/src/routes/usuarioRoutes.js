const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Importamos tu middleware de autenticación (Asegúrate de que la ruta sea correcta)
// En tu app.js vi que tu carpeta se llama 'middleware' y el archivo 'authMiddleware.js'
const { verificarToken } = require('../middleware/authMiddleware'); 

// Creamos la ruta GET protegida por el token
router.get('/usuarios', verificarToken, usuarioController.getUsuarios);

module.exports = router;