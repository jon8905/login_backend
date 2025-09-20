const express = require('express');
const RolesController = require('../controller/roles.controller');


const router = express.Router();
const rolesControlles = new RolesController();

router.get('/', (req, res) => rolesController.obtenerRoles(req, res));
router.get('/:id', (req, res) => rolesController.obtenerRolPorId(req, res));
router.post('/', (req, res) => rolesController.agregarRol(req, res));
router.put('/:id', (req, res) => rolesController.actualizarRol(req, res));
router.delete('/', (req, res) => rolesController.eliminarRol(req, res));

module.exports = router;