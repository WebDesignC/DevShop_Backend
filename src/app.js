// src/app.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const serverless = require('serverless-http');

const categoriasRoutes = require('./routes/CategoriaRoute');
const productoRoutes = require('./routes/ProductoRoute');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/api/categorias', categoriasRoutes);
app.use('/api/productos', productoRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

// Conexión a Mongo para Vercel
let isConnected = false;
async function connectToMongo() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  isConnected = true;
  console.log("MongoDB conectado (Vercel)");
}

// Export para serverless
module.exports = async (req, res) => {
  await connectToMongo();
  const handler = serverless(app);
  return handler(req, res);
};
