// seed/seedData.js
require('dotenv').config();
const mongoose = require('mongoose');
const Categoria = require('../models/Categoria');
const categorias = require('../data/categorias.json');

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Mongo conectado para seed');

    // Verificar si ya existen categorías
    const existingCategories = await Categoria.countDocuments();
    
    if (existingCategories === 0) {
      // Solo insertar si no hay categorías
      const created = await Categoria.insertMany(categorias);
      console.log('Categorias insertadas:', created.length);
    } else {
      console.log(`Ya existen ${existingCategories} categorías. Saltando inserción.`);
    }

    await mongoose.disconnect();
    console.log('Seed finalizado y desconectado');
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

run();
