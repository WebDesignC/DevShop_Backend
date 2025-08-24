// seed/seedProducts.js
require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const Producto = require('../models/Producto'); // Asegúrate de tener models/Producto.js
// Si en tu modelo usas otro nombre o ruta, ajusta aquí.

async function run() {
  const filePath = path.join(__dirname, '..', 'data', 'productos.json');
  if (!fs.existsSync(filePath)) {
    console.error('No se encontró data/productos.json');
    process.exit(1);
  }

  const productosJson = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Mongo conectado (seed products)');

    // Opcional: eliminar productos previos con mismo "id" (campo id en el JSON)
    // Si quieres un reset total: await Producto.deleteMany();
    for (const p of productosJson) {
      // Convertir id_categoria a ObjectId si viene como string
      const categoriaId = mongoose.Types.ObjectId.isValid(p.id_categoria)
        ? mongoose.Types.ObjectId(p.id_categoria)
        : null;

      // Upsert por campo `id` si existe (evita duplicados)
      const filter = { id: p.id }; // requiere que en tu modelo exista campo `id` o usa `nombre` como clave
      const updateDoc = {
        $set: {
          id: p.id,
          nombre: p.nombre,
          descripcion: p.descripcion,
          precio: p.precio,
          categoriaId: categoriaId,
          categoria: p.categoria,
          imagen: p.imagen,
          stock: p.stock || 100,
          activo: true,
          destacado: p.destacado || false,
          fechaCreacion: new Date()
        }
      };
      const options = { upsert: true, new: true, setDefaultsOnInsert: true };

      await Producto.updateOne(filter, updateDoc, options);
      console.log(`Upserted: ${p.id} - ${p.nombre}`);
    }

    console.log('Seed productos completado.');
    await mongoose.disconnect();
  } catch (err) {
    console.error('Error seed:', err);
    await mongoose.disconnect();
    process.exit(1);
  }
}

run();
