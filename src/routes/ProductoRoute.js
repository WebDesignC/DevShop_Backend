const express = require('express')
const multer = require('multer');
const route = express.Router()
const streamifier = require('streamifier');
const cloudinary = require('cloudinary').v2;
//const producto =require('../models/Producto')

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

route.get('/productos',(req, res)=>{

})

route.post('/productos', upload.single('imagen'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No se encontró ninguna imagen.' });
    }
    // Sube la imagen a Cloudinary
    const uploadResult = await uploadFromBuffer(req.file.buffer);
    const { nombre, descripcion, precio, id_categoria, categoria } = req.body;
    const imageUrl = uploadResult.secure_url;

    // Crea un nuevo producto con la URL de la imagen
    const newProduct = new Producto({
      nombre,
      descripcion,
      precio,
      id_categoria,
      categoria,
      imagen: imageUrl, // Guarda la URL de la imagen
      public_id: uploadResult.public_id // Guarda el public_id
    });

    await newProduct.save();
    res.status(201).json(newProduct);

  } catch (error) {
    console.error('Error al crear el producto:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
});

route.put('/productos/:id',(req, res)=>{

})

route.delete('/productos/:id',(req, res)=>{

})

module.exports = route;