const express = require('express')
const route = express.Router()
const categoriaController = require('../controllers/CategoriaController');
const validate = require('../middleware/validate');
const categoriaSchema = require('../validators/categoriaValidator')
// const categoria =require('../models/Categoria')


//Rutas de categorias corregidas despues de testeo con postman
route.get('/', categoriaController.list);
route.get('/:id', categoriaController.getById);
route.post('/', validate(categoriaSchema), categoriaController.create);
route.put('/:id', validate(categoriaSchema), categoriaController.update);
route.delete('/:id', categoriaController.remove);

module.exports = route;