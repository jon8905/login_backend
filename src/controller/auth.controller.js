const db = require('../config/conexion_bd');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class AuthController {
    
    async login(req, res) {
        const { email, password } = req.body;

        try { 
            const [usuarios] = await db.promise().query('SELECT * FROM usuarios WHERE email = ?', [email]);

            if (usuarios.length === 0) {
                return res.status(401).json({ message: 'Usuario no encontrado' });
            }

            const usuario = usuarios[0];

            const esValida = await bcrypt.compare(password, usuario.clave);
            if (!esValida) {
                return res.status(401).json({ error: 'Contraseña incorrecta' });
            }

            // obtener rol y permisos del usuario
            const [rolDatos] = await db.query('SELECT r.nombre AS rol, p.nombre AS permiso FROM roles r JOIN rol_permiso rp ON r.id = rp.id_rol JOIN permisos p ON rp.permiso_id WHERE r.id = ?', [usuario.id_rol]

            );

            // GenerarJWT 
            const token = jwt.sign(
                { id: usuario.id_usuario, rol: usuario.id_rol},
                'secreto_super_seguro',
                { expiresIn: '1h' } 

            );

            res.json({
                message: 'Inicio de sesión exitoso',
                token,
                usuario: {
                    id: usuario.id_usuario,
                    nombre: usuario.nombre,
                    email: usuario.email,
                    rol: rolDatos[0]?.rol || 'Sin Rol',
                    permisos: rolDatos.map(p => p.permiso)
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error en el servidor' });
        }   
    }
}
module.exports = new AuthController();