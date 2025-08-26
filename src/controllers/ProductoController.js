const Producto = require('../models/Producto');

exports.list = async (req, res, next) => {
    try {
        const productos = await Producto.find({}).populate('categoria', 'nombre slug');
        res.json(productos);
    } catch (error) {
        next(error);
    }
};

exports.getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const producto = await Producto.findById(id).populate('categoria', 'nombre slug');
        
        if (!producto) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        
        res.json(producto);
    } catch (error) {
        next(error);
    }
};

exports.getByCategoria = async (req, res, next) => {
    try {
        const { categoriaId } = req.params;
        const productos = await Producto.find({ 
            categoria: categoriaId
        }).populate('categoria', 'nombre slug');
        
        res.json(productos);
    } catch (error) {
        next(error);
    }
};

exports.create = async (req, res, next) => {
    try {
        const producto = new Producto(req.body);
        await producto.save();
        res.status(201).json(producto);
    } catch (error) {
        next(error);
    }
};

exports.update = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const productoUpdate = await Producto.findByIdAndUpdate(id, req.body, { new: true });
        if (!productoUpdate) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        
        res.json(productoUpdate);
    } catch (error) {
        next(error);
    }
};

exports.remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        const productoEliminado = await Producto.findByIdAndDelete(id);
        if (!productoEliminado) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.json(productoEliminado);
    } catch (error) {
        next(error);
    }
};

