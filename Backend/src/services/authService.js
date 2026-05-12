const pool = require('../config/db');
const { generarToken } = require('../utils/jwt');
const bcrypt = require('bcrypt');
class AuthService {
    static async registrarUsuario(datos) {
        const { email, password, fk_rol } = datos;
        const [existentes] = await pool.execute(
            'SELECT id_usuario FROM usuarios WHERE email = ?', 
            [email]
        );
        if (existentes.length > 0) {
            const error = new Error('El correo ya está registrado');
            error.statusCode = 400;
            throw error;
        }
        const salt = await bcrypt.genSalt(10);
        const passwordHasheada = await bcrypt.hash(password, salt);
        const rolPorDefecto = fk_rol || 3; 
        const [resultado] = await pool.execute(
            'INSERT INTO usuarios (email, password_hash, fk_rol) VALUES (?, ?, ?)', 
            [email, passwordHasheada, rolPorDefecto]
        );
        const [rolData] = await pool.execute('SELECT nombre FROM rol WHERE id_rol = ?', [rolPorDefecto]);
        const nombreRol = rolData[0].nombre;
        const nuevoUsuario = { 
            id: resultado.insertId, 
            email, 
            rol: nombreRol 
        };
        const token = generarToken(nuevoUsuario);
        return { usuario: nuevoUsuario, token };
    }
    static async login(email, password) {
        const [usuarios] = await pool.execute(
            `SELECT u.id_usuario, u.email, u.password_hash, r.nombre AS rol
            FROM usuarios u
            JOIN rol r ON u.fk_rol = r.id_rol
            WHERE u.email = ?`, 
            [email]
        );
        const usuario = usuarios[0];
        if (!usuario) {
            const error = new Error('Credenciales inválidas');
            error.statusCode = 401;
            throw error;
        }
        const esValida = await bcrypt.compare(password, usuario.password_hash);
        if (!esValida) {
            const error = new Error('Credenciales inválidas');
            error.statusCode = 401;
            throw error;
        }
        const token = generarToken({
            id: usuario.id_usuario,
            email: usuario.email,
            rol: usuario.rol 
        });
        const { password_hash, ...usuarioSinPassword } = usuario;
        return { usuario: usuarioSinPassword, token };
    }
}
module.exports = AuthService;