module.exports = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true  // aquí sanitizamos
        });
        if (error) {
            return res.status(400).json({
                message: "Error de validación",
                detalles: error.details.map(err => err.message)
            });
        }
        req.body = value; // body ya sanitizado
        next();
    };
};
