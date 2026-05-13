const express = require('express');
const AuthController = require('../controllers/authController');
const { verificarToken, autorizarRoles } = require('../middleware/authMiddleware');

const router = express.Router();

//Rutas públicas
router.post('/register', AuthController.registrar);
router.post('/login', AuthController.login);

//Ruta protegida (requiere token)
router.get('/perfil', verificarToken, (req, res) => {
    res.json({ 
        success: true, 
        data: `Hola ${req.user.email}, tu rol es ${req.user.rol}` 
    });
});

//Ruta protegida por roles (AJUSTADA A TU BD)
router.get(
    '/admin-dashboard',
    verificarToken,
    autorizarRoles('Administrador', 'co_administrador'),
    (req, res) => {
        res.json({ 
            success: true, 
            data: 'Bienvenido al panel de administración.' 
        });
    }
);
router.get('/usuarios', verificarToken, AuthController.listarUsuarios);

module.exports = router;