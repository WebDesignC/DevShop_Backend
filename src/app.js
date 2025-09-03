const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const categoriasRoutes = require("./routes/CategoriaRoute");
const productoRoutes = require("./routes/ProductoRoute");
const authRoutes = require("./routes/authRoute");
const usuarioRoutes = require("./routes/UsuarioRoute");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/categorias", categoriasRoutes);
app.use("/api/productos", productoRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/usuarios", usuarioRoutes);

app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

// Conexión a MongoDB
// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch((err) =>
    console.error("Error conectando a MongoDB:", err.message)
  );

module.exports = app;
