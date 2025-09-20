const db = require('../config/conexion_bd');


class RolesPermisosController {
    async obtenerRoles(req, res) {
        try {
            const [roles] = await db.query('SELECT rp.id_rol, r.nombre AS rol, p.nombre AS permiso FROM roles r JOIN rol_permiso rp ON r.id = rp.id_rol JOIN permisos p ON rp.permiso_id = p.id_permiso');
            res.json(rolPermisos);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener roles y permisos' });
        }
    }

    async obtenerPermisosDeRol(req, res) {
        const { idrol } = req.params;
        try {
            const [permisos] = await db.query('SELECT p.id_permiso, p.nombre, p.descripcion FROM permisos p JOIN rol_permiso rp ON p.id_permiso = rp.permiso_id WHERE rp.id_rol = ?', [idrol]);
            res.json(permisos);
        } catch (error) {
            console.error("Error al obtener permisos del rol:", error);
            res.status(500).json({ error: 'Error al obtener permisos del rol' });
        }
    }

    async agregarRolPermiso(req, res) {
        const { idrol, idpermiso } = req.body;
        try {
            await db.query('INSERT INTO rol_permiso (id_rol, permiso_id) VALUES (?, ?)', [idrol, idpermiso]);
            res.json({ message: 'Permiso asignado al rol exitosamente' });
        } catch (error) {
            console.error("Error al asignar permiso al rol:", error);
            res.status(500).json({ error: 'Error al asignar permiso al rol' });
        }
    }

    async actualizarRolPermiso(req, res) {
        const { id } = req.params;
        const { id_rol, idpermiso } = req.body;
        try {
            await db.query('UPDATE rol_permiso SET id_rol = ?, permiso_id = ? WHERE id = ?', [id_rol, idpermiso, id]);
            res.json({ message: 'Rol y permiso actualizados exitosamente' });
        } catch (error) {
            console.error("Error al actualizar rol y permiso:", error);
            res.status(500).json({ error: 'Error al actualizar rol y permiso' });
        }
    }

    async eliminarRolPermiso(req, res) {
        const { id } = req.params;
        try {
            await db.query('DELETE FROM rol_permiso WHERE id = ?', [id]);
            res.json({ message: 'Rol y permiso eliminados exitosamente' });
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar rol y permiso' });
        }
    }
}
module.exports = new RolesPermisosController();
