const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
exports.register = async (req, res, next) => {
  try {
    const { nombre, email, password } = req.body;

    // Verificar si ya existe
    const existeUsuario = await Usuario.findOne({ email });
    if (existeUsuario) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    // Hashear password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const usuario = new Usuario({
      nombre,
      email,
      password: hashedPassword,
    });

    await usuario.save();

    res.status(201).json({ message: "Usuario registrado con éxito" });
  } catch (error) {
    next(error);
  }
};

// LOGIN
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(400).json({ message: "Usuario no encontrado" });

    const esValido = await bcrypt.compare(password, usuario.password);
    if (!esValido) return res.status(400).json({ message: "Credenciales incorrectas" });

    const token = jwt.sign(
      { id: usuario._id, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, usuario });
  } catch (error) {
    next(error);
  }
};
