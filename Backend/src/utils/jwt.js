const jwt = require('jsonwebtoken');

const generarToken = (usuario) => {
    const payload = {
        id: usuario.id,
        email: usuario.email,
        rol: usuario.rol
    };
    return jwt.sign(payload, process.env.JWT_SECRET || 'clave_maestra_super_secreta', {
        expiresIn: process.env.JWT_EXPIRES_IN || '24h'
    });
};

module.exports = { generarToken };