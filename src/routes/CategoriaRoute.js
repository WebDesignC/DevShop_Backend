const express = require('express')
const route = express.Router()
const categoriaController = require('../controllers/CategoriaController');
const validate = require('../middleware/validate');
const categoriaSchema = require('../validators/categoriaValidator')
// const categoria =require('../models/Categoria')

route.get('/categoria',categoriaController.list);

route.get('/categoria/:id',categoriaController.getById);

route.post('/categoria',validate(categoriaSchema),categoriaController.create);

route.put('/categoria/:id', validate(categoriaSchema), categoriaController.update);

route.delete('/categoria/:id',categoriaController.remove);