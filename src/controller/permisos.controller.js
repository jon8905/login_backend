const db = require('../config/conexion_bd');

class PermisosController {
    async obtenerPermisos(req, res) {
        try {
            const [permisos] = await db.query('SELECT * FROM permisos');
            res.json(permisos);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener permisos' });
        }
}

async obtenerPermmisoPorId(req, res) {
    const { id } = req.params;
    try {
        const [permisos] = await db.query('SELECT * FROM permisos WHERE id_permiso= ?', [id]);
        if (permiso.length === 0) {
            return res.status(404).json({ error: 'Permiso no encontrado' });
        }
        res.json(permiso[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener permiso' });
    }   
}

async agregarPermiso(req, res) {
    const { nombre, descripcion } = req.body;
    try {
        await db.query('INSERT INTO permisos (nombre, descripcion) VALUES (?, ?)', [nombre, descripcion]);
        res.json({ message: 'Permiso agregado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al agregar permiso' });
    }
}

async actualizarPermiso(req, res) {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    try {
        await db.query('UPDATE permisos SET nombre = ?, descripcion = ? WHERE id_permiso = ?', [nombre, descripcion, id]);
        res.json({ message: 'Permiso actualizado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar permiso' });     

    }
}
    async eliminarPermiso(req, res) {
        const { id } = req.params;
        try {
            await db.query('DELETE FROM permisos WHERE id_permiso = ?', [id]);
            res.json({ message: 'Permiso eliminado exitosamente' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al eliminar permiso' });
        }   
    }
}
module.exports =  PermisosController;
