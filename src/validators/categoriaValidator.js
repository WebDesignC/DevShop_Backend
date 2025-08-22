const Joi = require('joi');

const categoriaSchema = Joi.object({
    nombre:Joi.string().min(3).required(),
    slug: Joi.string().min(3).required(),
    activa: Joi.boolean().optional()
})

module.exports = categoriaSchema;