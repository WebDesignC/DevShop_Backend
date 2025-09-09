const express = require("express");
const router = express.Router();
const authController = require("../controllers/AuthController");
const passport = require("passport"); // Importar passport

// Rutas de autenticación
router.post("/register", authController.register);
router.post("/login", authController.login);

// --- RUTAS DE AUTENTICACIÓN CON GOOGLE ---

// 1. Inicia el proceso de autenticación con Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// 2. Callback de Google: Google redirige aquí después de que el usuario autoriza.
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login", successRedirect: "/" }) // Las URLs de redirección deben apuntar a tu frontend
);


// 3. Ruta para cerrar sesión
router.post("/logout", (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect(process.env.FRONTEND_URL || '/');
  });
});

// --- FIN DE LAS RUTAS DE AUTENTICACIÓN CON GOOGLE ---

module.exports = router;
