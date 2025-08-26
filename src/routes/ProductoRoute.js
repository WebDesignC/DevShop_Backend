const express = require('express');
const multer = require('multer');
const route = express.Router();
const streamifier = require('streamifier');
const cloudinary = require('cloudinary').v2;
const Producto = require('../models/Producto');
const productoController = require('../controllers/ProductoController');
const validate = require('../middleware/validate');
const productoSchema = require('../validators/productoValidator');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadFromBuffer = (buffer) => {
  return new Promise((resolve, reject) => {
    let cld_upload_stream = cloudinary.uploader.upload_stream(
      {},
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
    streamifier.createReadStream(buffer).pipe(cld_upload_stream);
  });
};

route.get('/', productoController.list);

route.get('/:id', productoController.getById);

route.get('/categoria/:categoriaId', productoController.getByCategoria);

route.post('/', validate(productoSchema), productoController.create);

route.put('/:id', validate(productoSchema), productoController.update);

route.delete('/:id', productoController.remove);

module.exports = route;