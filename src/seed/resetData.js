// seed/resetData.js - SOLO PARA DESARROLLO
require('dotenv').config();
const mongoose = require('mongoose');
const Categoria = require('../models/Categoria');
const Producto = require('../models/Producto');
const categorias = require('../data/categorias.json');

async function reset() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Mongo conectado para reset');

    // ⚠️ ADVERTENCIA: Esto elimina TODOS los datos
    console.log('⚠️  ELIMINANDO TODOS LOS DATOS...');
    
    await Producto.deleteMany();
    console.log('Productos eliminados');
    
    await Categoria.deleteMany();
    console.log('Categorías eliminadas');

    // Reinsertar categorías
    const created = await Categoria.insertMany(categorias);
    console.log('Categorias reinsertadas:', created.length);

    await mongoose.disconnect();
    console.log('Reset completado');
  } catch (err) {
    console.error('Reset error:', err);
    process.exit(1);
  }
}

// Solo ejecutar si se llama directamente
if (require.main === module) {
  reset();
}

module.exports = reset;
