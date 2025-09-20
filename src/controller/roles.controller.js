const db = require('../config/conexion_bd');

class RolesController {
    async obtenerRoles(req, res) {
        try {
            const [roles] = await db.query('SELECT r.id, r.nombre, COUNT(u.id_usuario) AS numero_usuarios FROM roles r LEFT JOIN usuarios u ON r.id = u.id_rol GROUP BY r.id, r.nombre');
            res.json(roles);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener roles' });    
        }
    }
    async obtenerRolPorId(req, res) {
        const { id } = req.params;
        try {
            const [rolRows] = await db.query('SELECT * FROM roles WHERE id = ?', [id]);
            if (rol.length === 0) {
                return res.status(404).json({ error: 'Rol no encontrado' });
            }
            
            const rol = rolRows[0];

            const [permisos] = await db.query(
                'SELECT p.id_permiso, p.nombre, p.descripcion FROM permisos p JOIN rol_permiso rp ON p.id_permiso = rp.permiso_id WHERE rp.id_rol = ?', [rol.id_rol]
            );

            rol.permisos = permisos.map(p => ({ id: p.id_permiso, nombre: p.nombre, descripcion: p.descripcion }));

            res.json(rol);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener rol' });
        }
    }

    async agregarRol(req, res) {
        const { nombre, permisos } = req.body;
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();

            const [result] = await connection.query('INSERT INTO roles (nombre) VALUES (?)', [nombre]);
             const idRol = result.insertId;
            if (permisos && permisos.length > 0) {
                const values = permisos.map(idPermiso => [idRol, idPermiso]);
                await connection.query('INSERT INTO rol_permiso (id_rol, permiso_id) VALUES ?', [values]);
            }
            await connection.commit();
            res.json({ message: 'Rol agregado exitosamente', id: idRol });
        } catch (error) {
            await connection.rollback();
            res.status(500).json({ error: 'Error al agregar rol' });
        } finally {
            connection.release();
        }
    }


    async actualizarRol(req, res) {
        const { id } = req.params;
        const { nombre, permisos } = req.body;
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();
            await connection.query('UPDATE roles SET nombre = ? WHERE id = ?', [nombre, id]);
            await connection.query('DELETE FROM rol_permiso WHERE id_rol = ?', [id]);
            if (permisos && permisos.length > 0) {
                const values = permisos.map(idPermiso => [id, idPermiso]);
                await connection.query('INSERT INTO rol_permiso (id_rol, permiso_id) VALUES ?', [values]);
            }
            await connection.commit();
            res.json({ message: 'Rol actualizado exitosamente' });
        } catch (error) {
            await connection.rollback();
            res.status(500).json({ error: 'Error al actualizar rol' });
        } finally {
            connection.release();
        }
    }

    async eliminarRol(req, res) {
        const { id } = req.params;
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();
            await connection.query('DELETE FROM rol_permiso WHERE id_rol = ?', [id]);
            await connection.query('DELETE FROM roles WHERE id = ?', [id]);
            await connection.commit();
            res.json({ message: 'Rol eliminado exitosamente' });
        } catch (error) {
            await connection.rollback();
            res.status(500).json({ error: 'Error al eliminar rol' });
        } finally {
            connection.release();
        }
    }
}
module.exports = new RolesController();
