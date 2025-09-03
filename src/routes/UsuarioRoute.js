const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/UsuarioController');
const validate = require('../middleware/validate');
const usuarioSchema = require('../validators/usuarioValidator');

router.get("/", usuarioController.list);
router.get("/:id", usuarioController.getById);
router.put("/:id", usuarioController.update);
router.delete("/:id", usuarioController.remove);

module.exports = router;