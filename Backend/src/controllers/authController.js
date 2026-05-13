const AuthService = require('../services/authService');
class AuthController {
    static async registrar(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ success: false, message: "Email y password requeridos" });
            }
            const result = await AuthService.registrarUsuario(req.body);
            res.status(201).json({
                success: true,
                message: 'Usuario registrado exitosamente',
                data: result
            });
        } catch (error) {
            next(error);
        }
    }
    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Email y password son obligatorios'
                });
            }
            const result = await AuthService.login(email, password);
            if (!result) {
                return res.status(401).json({
                    success: false,
                    message: 'Credenciales incorrectas'
                });
            }
            res.status(200).json({
                success: true,
                message: 'Login exitoso',
                data: result
            });
        } catch (error) {
            if (error.statusCode) {
                return res.status(error.statusCode).json({
                    success: false,
                    message: error.message
                });
            }
            next(error);
        }
    }
    static async listarUsuarios(req, res, next) {
        try {
            const usuarios = await AuthService.obtenerUsuarios();
            res.status(200).json(usuarios);
        } catch (error) {
            next(error);
        }
    }
}
module.exports = AuthController;