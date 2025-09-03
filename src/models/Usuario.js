const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  apellidos: { type: String, required: true, trim: true },
  fechaNacimiento: { type: Date, required: true },
  nacionalidad: { 
    type: String, 
    required: true,
    enum: ['mexicana', 'estadounidense', 'colombiana', 'española', 'argentina', 'otra']
  },
  genero: { 
    type: String, 
    required: true,
    enum: ['Masculino', 'Femenino', 'Otro', 'Prefiero no decirlo']
  },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6 },
  imagen: { type: String, default: null },
  fechaRegistro: { type: Date, default: Date.now },
  activo: { type: Boolean, default: true },
  rol: { type: String, default: 'usuario', enum: ['usuario', 'admin'] }
}, {
  timestamps: true
});

module.exports = mongoose.model('Usuario', usuarioSchema);