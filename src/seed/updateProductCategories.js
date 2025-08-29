// seed/updateProductCategories.js
require('dotenv').config();
const mongoose = require('mongoose');
const Producto = require('../models/Producto');
const productos = require('../data/productos.json');

const updateCategorias = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    });
    console.log('Mongo conectado para actualizar categorías');

    let updatedCount = 0;
    let notFoundCount = 0;

    for (const producto of productos) {
      try {
        // Buscar producto por nombre (ya que no tenemos _id en el JSON)
        const result = await Producto.updateOne(
          { nombre: producto.nombre },  // busca el producto por nombre
          { $set: { categoria: producto.categoria } } // actualiza la categoria
        );

        if (result.matchedCount > 0) {
          if (result.modifiedCount > 0) {
            console.log(`✅ Actualizado: ${producto.nombre} -> ${producto.categoria}`);
            updatedCount++;
          } else {
            console.log(`ℹ️  Sin cambios: ${producto.nombre} (categoría ya correcta)`);
          }
        } else {
          console.log(`❌ No encontrado: ${producto.nombre}`);
          notFoundCount++;
        }
      } catch (error) {
        console.error(`❌ Error actualizando ${producto.nombre}:`, error.message);
      }
    }

    console.log('\n📊 Resumen:');
    console.log(`✅ Productos actualizados: ${updatedCount}`);
    console.log(`❌ Productos no encontrados: ${notFoundCount}`);
    console.log(`📝 Total procesados: ${productos.length}`);

    await mongoose.disconnect();
    console.log('Actualización completada');
  } catch (err) {
    console.error('❌ Error general:', err);
    await mongoose.disconnect();
    process.exit(1);
  }
};

// Solo ejecutar si se llama directamente
if (require.main === module) {
  updateCategorias();
}

module.exports = updateCategorias;
