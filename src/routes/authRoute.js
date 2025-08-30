const express = require('express');
const bcrypt = require('bcryptjs');
const User = require("../models/User");
const router = express.Router();

const atob = (str) => Buffer.from(str, "base64").toString("binary");

// Verifica usuario y contraseña
async function authBasic(req, res, next) {
    // Permiso
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Basic ")) {
        return res.status(400).json({ msg: "No tienes permiso" });
    }

    const base64Credentials = authHeader.split(" ")[1];
    const [email, password] = atob(base64Credentials).split(":");
    
    // Buscar usuario en la base de datos
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ msg: "Licencias no validas" });

    // Verificar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: "Licencias no validas" });

    req.user = { id: user._id, email: user.email };
    next();
}

// Crear una cuenta nueva
router.post("/register", async (req, res) => {
    try {
        const { email, password, name, image } = req.body;
        
        const userExist = await User.findOne({ email });
        if (userExist) return res.status(400).json({ msg: "Usuario ya existe" });

        const hashedPass = await bcrypt.hash(password, 10);
        
        // Guardar nuevo usuario
        const newUser = new User({ email, password: hashedPass, name , image });
        await newUser.save();

        res.status(200).json({ msg: "¡Usuario creado!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/me", authBasic, (req, res) => {
    res.json({ msg: "¡Bienvenido!", user: req.user });
});

// Exportar para usar en otros archivos
module.exports = router;