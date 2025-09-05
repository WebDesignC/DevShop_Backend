const mongoose = require("mongoose");
const bcrypt = require('bcryptjs'); // AÑADIDO: para encriptar contraseñas

// Se combinan los campos de ambos archivos y se añaden las mejoras
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true, // AÑADIDO: para consistencia
        trim: true,      // AÑADIDO: para limpiar espacios
    },
    password: {
        type: String,
        required: false, // MODIFICADO: ya no es obligatorio para el login con Google
    },
    name: {
        type: String,
        required: true,
        trim: true,      // AÑADIDO: para limpiar espacios
    },
    image: {
        type: String,
        default: ""
    },
    // AÑADIDO: Campo para diferenciar usuarios locales de los de Google
    authMethod: {
        type: String,
        enum: ['local', 'google'],
        default: 'local',
    }
}, {
    timestamps: true, // AÑADIDO: para tener createdAt y updatedAt
});


// AÑADIDO: Middleware para encriptar la contraseña antes de guardarla
userSchema.pre('save', async function (next) {
    // Solo se encripta si la contraseña fue modificada y es un usuario local
    if (!this.isModified('password') || this.authMethod !== 'local' || !this.password) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// AÑADIDO: Método para comparar la contraseña ingresada con la guardada
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


module.exports = mongoose.model("User", userSchema);
