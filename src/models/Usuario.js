const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  googleId: { type: String, unique: true, sparse: true }, // ID único de Google, sparse para permitir valores nulos
  nombre: { type: String, required: true, trim: true },
  apellidos: { type: String, required: false, trim: true }, // Apellidos no es provisto por Google
  fechaNacimiento: { type: Date, required: false }, // No es provisto por Google
  nacionalidad: { 
    type: String, 
    required: false,
    enum: ['mexicana', 'estadounidense', 'colombiana', 'española', 'argentina', 'otra']
  },
  genero: { 
    type: String, 
    required: false,
    enum: ['Masculino', 'Femenino', 'Otro', 'Prefiero no decirlo']
  },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: false, minlength: 6 },
  imagen: { type: String, default: null }, // La foto de perfil de Google se guardará aquí
  fechaRegistro: { type: Date, default: Date.now },
  activo: { type: Boolean, default: true },
  rol: { type: String, default: 'usuario', enum: ['usuario', 'admin'] }
}, {
  timestamps: true
});

module.exports = mongoose.model('Usuario', usuarioSchema);