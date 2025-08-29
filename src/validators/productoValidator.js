const Joi = require('joi');

const productoSchema = Joi.object({
    nombre: Joi.string().min(3).required(),
    descripcion: Joi.string().optional(),
    precio: Joi.number().positive().required(),
    categoria: Joi.string().hex().length(24).required(),
    imagen: Joi.string().optional(),
    stock: Joi.number().integer().min(0).optional(),
    activo: Joi.boolean().optional(),
    destacado: Joi.boolean().optional()
});

module.exports = productoSchema;
