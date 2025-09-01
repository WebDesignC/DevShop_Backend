import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

const categoriasRoutes = require('./routes/CategoriaRoute');
const productoRoutes = require('./routes/ProductoRoute');
const authRoute = require("./routes/authRoute");

dotenv.config();

app.use(cors());
const app = express();
app.use(express.json());
app.use('/api/categorias', categoriasRoutes);
app.use('/api/productos', productoRoutes);
app.use("/api/auth", authRoute);

app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error("Error conectando a MongoDB:", err.message));

export default app;