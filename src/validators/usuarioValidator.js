const Joi = require('joi');

const usuarioSchema = Joi.object({
    nombre: Joi.string().min(2).max(50).required(),
    apellidos: Joi.string().min(2).max(100).required(),
    fechaNacimiento: Joi.date().max('now').required(),
    nacionalidad: Joi.string().valid('mexicana', 'estadounidense', 'colombiana', 'española', 'argentina', 'otra').required(),
    genero: Joi.string().valid('Masculino', 'Femenino', 'Otro', 'Prefiero no decirlo').required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(100).required(),
    imagen: Joi.string().optional(),
    activo: Joi.boolean().optional(),
    rol: Joi.string().valid('usuario', 'admin').optional()
});

module.exports = usuarioSchema;
