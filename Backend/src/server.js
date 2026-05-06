require('dotenv').config();

const app = require('./app');
const pool = require('./config/db');

// Render asignará un puerto automáticamente, si no, usa el 3000
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    // Quitamos el 'localhost' del log para no confundirnos en la nube
    console.log(`🚀 Servidor activo en el puerto: ${PORT}`);
});

process.on('SIGINT', async () => {
    console.log('Cerrando servidor...');
    try {
        await pool.end();
        server.close(() => {
            console.log('✅ Proceso terminado exitosamente');
            process.exit(0);
        });
    } catch (err) {
        console.error('Error al cerrar la base de datos:', err);
        process.exit(1);
    }
});