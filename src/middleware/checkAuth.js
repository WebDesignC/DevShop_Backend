// Middleware para proteger rutas y verificar si el usuario está autenticado

export const checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    // Si el usuario está autenticado, req.user contiene la información del usuario
    return next();
  }
  // Si no está autenticado, se envía una respuesta de no autorizado
  res.status(401).json({ message: "No autorizado. Por favor, inicie sesión." });
};