// app.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const categoriasRoutes = require('./routes/CategoriaRoute');
const productoRoutes = require('./routes/ProductoRoute');
const authRoute = require("./routes/authRoute");

// const errorHandler = require('./middleware/errorHandler'); // comentado porque no existe

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/api/categorias', categoriasRoutes);
app.use('/api/productos', productoRoutes);
app.use("/api/auth", authRoute);

// Error handler fallback (simple)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

// Conectarse a Mongo y arrancar servidor
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB conectado');
    app.listen(PORT, () => console.log(`Server corriendo en puerto ${PORT}`));
  })
  .catch(err => {
    console.error('Error conectando a MongoDB:', err.message);
    process.exit(1);
  });

module.exports = app;
