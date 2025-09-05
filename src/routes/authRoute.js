const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // <--  Para crear tokens
const { OAuth2Client } = require('google-auth-library'); // <--  Para verificar el token de Google
const User = require("../models/User");
const router = express.Router();

// ==============
// CONFIGURACIÓN
// ==============
// Asegúrate de tener un archivo .env con GOOGLE_CLIENT_ID y JWT_SECRET
require('dotenv').config();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const atob = (str) => Buffer.from(str, "base64").toString("binary");

// ==============
// FUNCIONES HELPER
// ==============

// Función para generar un token JWT (necesaria después del login)
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};


// ==============
// MIDDLEWARE 
// ==============
async function authBasic(req, res, next) {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Basic ")) {
        return res.status(400).json({ msg: "No tienes permiso" });
    }
    const base64Credentials = authHeader.split(" ")[1];
    const [email, password] = atob(base64Credentials).split(":");
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ msg: "Licencias no validas" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: "Licencias no validas" });
    req.user = { id: user._id, email: user.email };
    next();
}


// ==============
// RUTAS
// ==============

// Crear una cuenta nueva 
router.post("/register", async (req, res) => {
    try {
        const { email, password, name, image } = req.body;
        const userExist = await User.findOne({ email });
        if (userExist) return res.status(400).json({ msg: "Usuario ya existe" });
        const hashedPass = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPass, name , image });
        await newUser.save();
        res.status(200).json({ msg: "¡Usuario creado!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Ruta de login con Google (NUEVA RUTA AÑADIDA)
router.post("/google", async (req, res) => {
    const { token } = req.body; // El token que envía el frontend

    try {
        // 1. Verificar el token con los servidores de Google
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const { name, email } = ticket.getPayload();

        // 2. Buscar si el usuario ya existe en nuestra BD
        let user = await User.findOne({ email });

        // 3. Si no existe, lo creamos
        if (!user) {
            user = await User.create({
                name,
                email,
                authMethod: 'google', 
            });
        }

        // 4. Devolvemos nuestro propio token JWT para manejar la sesión
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });

    } catch (error) {
        res.status(401).json({ message: 'Token de Google inválido o expirado' });
    }
});


// Ruta de perfil 
router.get("/me", authBasic, (req, res) => {
    res.json({ msg: "¡Bienvenido!", user: req.user });
});

// Exportar para usar en otros archivos
module.exports = router;