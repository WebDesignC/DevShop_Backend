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
    try {
        const { id } = req.params;
        const { nombre, apellidos, fechaNacimiento, nacionalidad, genero, email, imagen } = req.body;
        
        // Verificar si el usuario existe
        const usuario = await Usuario.findById(id);
        if (!usuario || !usuario.activo) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Actualizar campos
        const camposActualizados = {};
        if (nombre) camposActualizados.nombre = nombre;
        if (apellidos) camposActualizados.apellidos = apellidos;
        if (fechaNacimiento) camposActualizados.fechaNacimiento = fechaNacimiento;
        if (nacionalidad) camposActualizados.nacionalidad = nacionalidad;
        if (genero) camposActualizados.genero = genero;
        if (email) camposActualizados.email = email;
        if (imagen !== undefined) camposActualizados.imagen = imagen;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(
            id,
            camposActualizados,
            { new: true, runValidators: true }
        ).select('-password');

        if (!usuarioActualizado) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.json(usuarioActualizado);
    } catch (error) {
        next(error);
    }
};

exports.remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findById(id);
        if (!usuario || !usuario.activo) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Soft delete - marcar como inactivo
        usuario.activo = false;
        await usuario.save();

        res.json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
        next(error);
    }
};

exports.cambiarPassword = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { passwordActual, nuevaPassword } = req.body;
        
        const usuario = await Usuario.findById(id);
        if (!usuario || !usuario.activo) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Verificar contraseña actual
        const passwordValida = await bcrypt.compare(passwordActual, usuario.password);
        if (!passwordValida) {
            return res.status(400).json({ message: "Contraseña actual incorrecta" });
        }

        // Encriptar nueva contraseña
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(nuevaPassword, saltRounds);
        
        usuario.password = hashedPassword;
        await usuario.save();

        res.json({ message: "Contraseña actualizada correctamente" });
    } catch (error) {
        next(error);
    }
};
