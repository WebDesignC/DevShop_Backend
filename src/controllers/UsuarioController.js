const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');

exports.list = async (req, res, next) => {
    try {
        const usuarios = await Usuario.find({ activo: true }, { password: 0 });
        res.json(usuarios);
    } catch (error) {
        next(error);
    }
};

exports.getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findById(id, { password: 0 });
        if (!usuario || !usuario.activo) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.json(usuario);
    } catch (error) {
        next(error);
    }
};

exports.create = async (req, res, next) => {
    try {
        const { nombre, apellidos, fechaNacimiento, nacionalidad, genero, email, password, imagen } = req.body;

        // Verificar si el email ya existe
        const usuarioExistente = await Usuario.findOne({ email });
        if (usuarioExistente) {
            return res.status(400).json({ message: "El email ya está registrado" });
        }

        // Encriptar contraseña
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Crear nuevo usuario
        const nuevoUsuario = new Usuario({
            nombre,
            apellidos,
            fechaNacimiento,
            nacionalidad,
            genero,
            email,
            password: hashedPassword,
            imagen: imagen || null
        });

        const usuarioGuardado = await nuevoUsuario.save();
        
        // Retornar usuario sin password
        const { password: _, ...usuarioSinPassword } = usuarioGuardado.toObject();
        res.status(201).json(usuarioSinPassword);
    } catch (error) {
        next(error);
    }
};

exports.update = async (req, res, next) => {
    // Implementar
};

exports.cambiarPassword = async (req, res, next) => {
    // Implementar
};
