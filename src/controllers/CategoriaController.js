const Categoria = require('../models/Categoria');
exports.list = async (req, res, next) => {
    try {
        const categorias = await Categoria.find();
        res.json(categorias);
    } catch (error) {
        next(error);
    }
}
exports.getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const categoria = await Categoria.findById(id);
        if (!categoria) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }
        res.json(categoria);
    } catch (error) {
        next(error);
    }
}

exports.create = async (req, res, next) => {
    try {
        const categoria = new Categoria(req.body);
        await categoria.save();
        res.status(201).json(categoria);
    } catch (error) {
        next(error);
    }
}

exports.update = async (req, res, next) => {
    try {
        const { id } = req.params;

        const categoriaUpdate = await Categoria.findByIdAndUpdate(id, req.body, { new: true })
        if (!categoriaUpdate) {
            return res.status(404).json({ message: "Categoría no encontrada" })
        }
        res.status(200).json(categoriaUpdate)
    } catch (error) {
        next(error);
    }
}

exports.remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        const categoriaEliminada = await Categoria.findByIdAndDelete(id);
        if (!categoriaEliminada) {
            return res.status(404).json({ message: "Categoría no encontrada" })
        }
        res.status(200).json(categoriaEliminada)
    } catch (error) {
        next(error);
    }
}