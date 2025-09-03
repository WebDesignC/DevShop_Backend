const express = require("express");
const router = express.Router();
const authController = require("../controllers/AuthController");

// Rutas de autenticación
router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
