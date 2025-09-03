const express = require('express');
const route = express.Router();
const usuarioController = require('../controllers/UsuarioController');
const validate = require('../middleware/validate');
const usuarioSchema = require('../validators/usuarioValidator');

route.get('/', usuarioController.list);
route.get('/:id', usuarioController.getById);
route.post('/', validate(usuarioSchema), usuarioController.create);
route.put('/:id', validate(usuarioSchema), usuarioController.update);
route.delete('/:id', usuarioController.remove);

route.post('/:id/cambiar-password', usuarioController.cambiarPassword);

module.exports = route;