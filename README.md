# 🛍️ MercArt Backend API

Backend REST API para e-commerce desarrollado con Node.js, Express y MongoDB Atlas.

## 🎯 **Objetivo**

Proporcionar endpoints RESTful para gestionar productos y categorías de una tienda online, facilitando la integración con frontend y simulando operaciones de e-commerce.

## 🚀 **Funcionalidades**

### **Categorías**
- ✅ CRUD completo (Crear, Leer, Actualizar, Eliminar)
- ✅ Validación de datos con Joi
- ✅ Respuestas JSON estandarizadas

### **Productos**
- ✅ CRUD completo con relaciones a categorías
- ✅ Filtrado por categoría
- ✅ Populate automático de datos de categoría
- ✅ Validación de datos con Joi
- ✅ Soporte para imágenes (Cloudinary)

## 📋 **Endpoints Disponibles**

### **Categorías**
```
GET    /api/categorias          - Listar todas las categorías
GET    /api/categorias/:id      - Obtener categoría específica
POST   /api/categorias          - Crear nueva categoría
PUT    /api/categorias/:id      - Actualizar categoría
DELETE /api/categorias/:id      - Eliminar categoría
```

### **Productos**
```
GET    /api/productos                    - Listar todos los productos
GET    /api/productos/:id                - Obtener producto específico
GET    /api/productos/categoria/:catId   - Filtrar productos por categoría
POST   /api/productos                    - Crear nuevo producto
PUT    /api/productos/:id                - Actualizar producto
DELETE /api/productos/:id                - Eliminar producto
```

## 🛠️ **Tecnologías Utilizadas**

### **Core**
- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **MongoDB Atlas** - Base de datos en la nube
- **Mongoose** - ODM para MongoDB

### **Validación & Middleware**
- **Joi** - Validación de esquemas
- **CORS** - Cross-Origin Resource Sharing
- **Body-parser** - Parsing de requests

### **Servicios Externos**
- **Cloudinary** - Almacenamiento de imágenes
- **Multer** - Manejo de archivos multipart

## 📁 **Estructura del Proyecto**

```
src/
├── app.js                 # Punto de entrada de la aplicación
├── controllers/           # Lógica de negocio
│   ├── CategoriaController.js
│   └── ProductoController.js
├── models/               # Esquemas de MongoDB
│   ├── Categoria.js
│   └── Producto.js
├── routes/               # Definición de rutas
│   ├── CategoriaRoute.js
│   └── ProductoRoute.js
├── middleware/           # Middlewares personalizados
│   └── validate.js
├── validators/           # Esquemas de validación
│   ├── categoriaValidator.js
│   └── productoValidator.js
├── data/                 # Datos de ejemplo
│   ├── categorias.json
│   └── productos.json
└── seed/                 # Scripts de población de BD
    ├── seedData.js
    └── seedProducts.js
```

## 🔧 **Instalación y Configuración**

### **1. Clonar y instalar dependencias**
```bash
git clone https://github.com/WebDesignC/DevShop_Backend.git
cd DevShop_Backend
npm install
```

### **2. Configurar variables de entorno**
Crear archivo `.env` en la raíz:
```env
PORT=5000
MONGO_URI=mongodb+srv://usuario:password@cluster.mongodb.net/database
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### **3. Ejecutar seed (opcional)**
```bash
npm run seed
```

### **4. Iniciar servidor**
```bash
# Desarrollo
npm run dev

# Producción
npm start
```

## 📊 **Modelos de Datos**

### **Categoria**
```javascript
{
  nombre: String (requerido, único),
  slug: String (requerido, único),
  activa: Boolean (default: true)
}
```

### **Producto**
```javascript
{
  nombre: String (requerido),
  descripcion: String,
  precio: Number (requerido),
  categoria: ObjectId (ref: 'Categoria'),
  imagen: String (URL),
  stock: Number (default: 100),
  activo: Boolean (default: true),
  destacado: Boolean (default: false),
  fechaCreacion: Date (auto)
}
```

## 🔌 **Integración Frontend**

### **Ejemplo de uso con fetch**
```javascript
// Obtener productos
const response = await fetch('http://localhost:5000/api/productos');
const productos = await response.json();

// Obtener productos por categoría
const productosTecnologia = await fetch(
  'http://localhost:5000/api/productos/categoria/68aa2d340d86e565c2af20af'
);

// Crear producto
const nuevoProducto = await fetch('http://localhost:5000/api/productos', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    nombre: 'Nuevo Producto',
    precio: 99.99,
    categoria: '68aa2d340d86e565c2af20af'
  })
});
```

## 🧪 **Testing**

### **Endpoints de prueba**
- **Categorías**: `GET http://localhost:5000/api/categorias`
- **Productos**: `GET http://localhost:5000/api/productos`
- **Productos por categoría**: `GET http://localhost:5000/api/productos/categoria/68aa2d340d86e565c2af20af`

### **Herramientas recomendadas**
- **Postman** - Testing de APIs
- **Insomnia** - Cliente REST alternativo

## 📝 **Scripts Disponibles**

```bash
npm run dev      # Desarrollo con nodemon
npm start        # Producción
npm run seed     # Poblar base de datos
```

## 🔒 **Seguridad**

- ✅ Validación de entrada con Joi
- ✅ Sanitización de datos
- ✅ CORS configurado
- ✅ Manejo de errores centralizado

## 🚀 **Próximas Funcionalidades**

- [ ] Autenticación JWT
- [ ] Carrito de compras
- [ ] Gestión de pedidos
- [ ] Paginación y filtros avanzados
- [ ] Búsqueda de productos
- [ ] Sistema de reviews

## 📞 **Soporte**

Para dudas técnicas o problemas de integración, revisar:
1. Logs del servidor
2. Respuestas de error de la API
3. Configuración de variables de entorno
4. Conexión a MongoDB Atlas

---

**Desarrollado con ❤️ para MercArt. Proyecto Final en DevF**
