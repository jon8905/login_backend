const express = require('express');
const UsuariosController = require('../controllers/usuarios.controller');

const router = express.Router();
const usuariosController = new UsuariosController();

router.get('/', usuariosController.obtenerUsuarios(req, res));
router.get('/:id', usuariosController.obtenerUsuarioPorId(req, res));
router.post('/', usuariosController.crearUsuario(req, res));
router.put('/:id', usuariosController.actualizarUsuario(req, res));
router.delete('/:id', usuariosController.eliminarUsuario(req, res));

module.exports = router;