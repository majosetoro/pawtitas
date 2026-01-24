# Backend - Arquitectura

Nueva estructura del backend.

## Estructura de carpetas

```
src/
├── app.js                   # Configuración de Express y middlewares
├── server.js                # Punto de entrada del servidor
│
├── config/                  # Configuraciones
│   ├── prisma.js            # Cliente Prisma singleton
│   ├── mailer.js            # Transporter de Nodemailer
│   └── constants.js         # Constantes (Overpass servers, etc.)
│
├── routes/                  # Definición de rutas HTTP
│   ├── auth.routes.js       # POST /login, POST /api/registro
│   ├── user.routes.js       # GET/PUT /api/perfil/:id
│   ├── contacto.routes.js   # POST /contacto
│   ├── overpass.routes.js   # GET /api/overpass
│   └── health.routes.js     # GET /health
│
├── controllers/             # Manejo de req/res, validaciones HTTP
│   ├── auth.controller.js
│   ├── user.controller.js
│   ├── contacto.controller.js
│   ├── overpass.controller.js
│   └── health.controller.js
│
├── services/                # Lógica de negocio
│   ├── registro.service.js  # registerUser, validateUserData
│   ├── email.service.js     # sendContactEmail
│   └── overpass.service.js  # queryOverpassWithRetry
│
├── repositories/            # Acceso a base de datos (Prisma)
│   ├── usuario.repo.js      # findByEmail, create, update
│   ├── genero.repo.js       # upsertGenero
│   ├── domicilio.repo.js    # create, update
│   ├── prestador.repo.js    # findByUsuarioId, upsert
│   ├── duenio.repo.js       # upsert
│   └── servicio.repo.js     # create, update
│
└── utils/                   # Funciones helper puras
    ├── ubicacion.js         # descomponerUbicacion
    ├── strings.js           # splitNombreApellido
    └── mappers.js           # buildPerfilFromServices, etc.
```

## Capas de la arquitectura

### 1. **Routes** (Rutas HTTP)
- **Responsabilidad**: Definir endpoints y asociar controladores
- **Ejemplo**: `router.post('/login', loginController)`
- **No debe**: Contener lógica de negocio

### 2. **Controllers** (Controladores)
- **Responsabilidad**: Validar requests, llamar servicios, formatear responses
- **Debe**: Manejar errores HTTP (400, 404, 500, etc.)
- **No debe**: Acceder directamente a la base de datos

### 3. **Services** (Servicios)
- **Responsabilidad**: Lógica de negocio, orquestación de repositorios
- **Debe**: Ser reutilizable, independiente de HTTP
- **Puede**: Usar transacciones, llamar múltiples repositorios

### 4. **Repositories** (Repositorios)
- **Responsabilidad**: Solo acceso a datos (queries Prisma)
- **Debe**: Ser agnóstico de la lógica de negocio
- **No debe**: Contener validaciones o transformaciones

### 5. **Utils** (Utilidades)
- **Responsabilidad**: Funciones helper puras, sin efectos secundarios
- **Debe**: Ser testeable, reutilizable
- **No debe**: Depender de otras capas

## Flujo de una request

```
Request HTTP
    ↓
Route (define endpoint)
    ↓
Controller (valida request)
    ↓
Service (lógica de negocio)
    ↓
Repository (acceso a DB)
    ↓
Prisma → MySQL
```

## Cómo agregar una nueva feature

### Ejemplo: Agregar endpoint "resetear contraseña"

1. **Crear repositorio** (si es necesario)
   ```javascript
   // repositories/usuario.repo.js
   async function updatePassword(userId, hashedPassword) {
     return prisma.usuario.update({
       where: { id: userId },
       data: { clave: hashedPassword }
     });
   }
   ```

2. **Crear servicio**
   ```javascript
   // services/password.service.js
   async function resetPassword(email, newPassword) {
     const user = await usuarioRepo.findByEmail(email);
     if (!user) throw new Error('Usuario no encontrado');
     const hashed = await bcrypt.hash(newPassword, 10);
     return await usuarioRepo.updatePassword(user.id, hashed);
   }
   ```

3. **Crear controller**
   ```javascript
   // controllers/password.controller.js
   async function resetPasswordController(req, res) {
     try {
       const { email, newPassword } = req.body;
       await resetPassword(email, newPassword);
       res.json({ success: true });
     } catch (e) {
       res.status(400).json({ success: false, message: e.message });
     }
   }
   ```

4. **Crear ruta**
   ```javascript
   // routes/password.routes.js
   router.post('/api/reset-password', resetPasswordController);
   ```

5. **Montar ruta en app.js**
   ```javascript
   const passwordRoutes = require('./routes/password.routes');
   app.use(passwordRoutes);
   ```
