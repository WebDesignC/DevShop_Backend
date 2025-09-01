import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import categoriasRoutes from "./routes/CategoriaRoute.js";
import productoRoutes from "./routes/ProductoRoute.js";
import authRoute from "./routes/authRoute.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/categorias", categoriasRoutes);
app.use("/api/productos", productoRoutes);
app.use("/api/auth", authRoute);

app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error("Error conectando a MongoDB:", err.message));

export default app;
