const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  precio: { type: Number, required: true },
  categoria: { type: mongoose.Schema.Types.ObjectId, ref: 'Categoria', required: true }, 
  imagen: { type: String },
  stock: { type: Number, default: 100 },
  activo: { type: Boolean, default: true },
  destacado: { type: Boolean, default: false },
  fechaCreacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Producto', productoSchema);
