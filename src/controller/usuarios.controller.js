const db =require('../config/conexion_bd');
const bcrypt = require('bcrypt');

class UsuariosController {
    async obtenerUsuarios(req, res) {
        try {
            const [usuarios] = await db.query('SELECT u.id_usuario, u.nombre, u.email, r.nombre AS rol, COALESCE(COUNT(p.id_permiso), 0) AS numero_permisos FROM usuarios u LEFT JOIN roles r ON u.id_rol = r.id LEFT JOIN rol_permiso rp ON r.id = rp.id_rol LEFT JOIN permisos p ON rp.permiso_id = p.id_permiso GROUP BY u.id_usuario, u.nombre, u.email, r.nombre');
            res.json(usuarios);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener usuarios' });
        }
    }
    async agregarUsuarioPorId(req, res) {
        const { nombre, email, clave, id_rol } = req.body;
        try {
            const hash = await bcrypt.hash(clave, 10);
            await db.query('INSERT INTO usuarios (nombre, email, clave, id_rol) VALUES (?, ?, ?, ?)', [nombre, email, hash, id_rol]);
            res.json({ message: 'Usuario agregado exitosamente' });
        } catch (error) {
            res.status(500).json({ error: 'Error al agregar usuario' });
        }
    }

    async actualizarUsuario(req, res) {
        const { id } = req.params;
        const { nombre, email, clave, id_rol } = req.body;
        try {
           if (clave && clave.trim() !== '') {
                const hash = await bcrypt.hash(clave, 10);
                await db.query('UPDATE usuarios SET nombre = ?, email = ?, clave = ?, id_rol = ? WHERE id_usuario = ?', [nombre, email, hash, id_rol, id]);
            } else {
                await db.query('UPDATE usuarios SET nombre = ?, email = ?, id_rol = ? WHERE id_usuario = ?', [nombre, email, id_rol, id]);
            }
            res.json({ message: 'Usuario actualizado exitosamente' });
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar usuario' });
        }
    }
    async eliminarUsuario(req, res) {
        const { id } = req.params;
        try {
            await db.query('DELETE FROM usuarios WHERE id_usuario = ?', [id]);
            res.json({ message: 'Usuario eliminado exitosamente' });
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar usuario' });
        }
    }
}
module.exports = new UsuariosController();