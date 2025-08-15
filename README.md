# 🐾 Pawtitas

## 🚀 Configuración Inicial

### 📋 Prerrequisitos OBLIGATORIOS
- **Node.js** (versión 18 o superior) - [Descargar aquí](https://nodejs.org/)
- **Expo CLI** instalado globalmente: `npm install -g @expo/cli`
- **Cuenta de Google** para Firebase (Todos los integrantes del equipo están invitados al proyecto)
- **Git** instalado en tu computadora

### 🔧 Pasos de Configuración PASO A PASO

#### 1. Instalar Expo CLI (globalmente)
```bash
npm install -g @expo/cli
```

#### 2. Clonar el proyecto
```bash
git clone [URL_DEL_REPOSITORIO]
cd pawtitas
```

#### 3. Instalar dependencias del proyecto
```bash
npm install
```

#### 4. Configurar Firebase (PASO CRÍTICO)
**⚠️ SIN ESTE PASO LA APP NO FUNCIONARÁ:**

1. Copiar la carpeta `firebase` completa al proyecto pawtitas

#### 5. Verificar que todo funciona
```bash
npx expo start
```

### ⚠️ Archivos Importantes

- **`firebaseConfig.js`** - Tu configuración de Firebase (NO se sube a Git)
- **`.env`** - Variables de entorno (opcional, NO se sube a Git)

### 🔒 Seguridad

- **NUNCA** subas `firebaseConfig.js` a Git
- **NUNCA** compartas tus claves de Firebase
- **SÍ** puedes subir `firebaseConfig.example.js`

### 📱 Estructura del Proyecto

```
pawtitas/
├── firebase/
│   ├── firebaseConfig.js          ← Tu configuración (NO en Git)
├── assets/                        ← Imágenes y recursos
├── App.js                         ← Componente principal
└── README.md                      ← Este archivo
```

### 🆘 Problemas Comunes y Soluciones

**Error: "Firebase not initialized"**
- Verifica que `firebaseConfig.js` existe
- Verifica que la configuración es correcta
- Reinicia el servidor: `npx expo start --clear`

**Error: "API key not valid"**
- Verifica que copiaste la configuración correcta de Firebase Console
- Asegúrate de que el proyecto esté activo en Firebase

**Error: "Module not found"**
- Ejecuta `npm install` para instalar dependencias
- Verifica que estés en la carpeta correcta

**Error: "Expo not found"**
- Instala Expo CLI: `npm install -g @expo/cli`
- Verifica que Node.js esté instalado correctamente

### 🚀 Comandos Útiles

```bash
# Iniciar desarrollo
npx expo start

# Limpiar cache y reiniciar
npx expo start --clear

# Instalar nuevas dependencias
npm install [nombre-paquete]

# Ver estado de Git
git status

# Ver logs de la app
npx expo logs
```

### 📞 Soporte

- **Documentación Firebase**: [https://firebase.google.com/docs](https://firebase.google.com/docs)
- **Documentación Expo**: [https://docs.expo.dev/](https://docs.expo.dev/)

### 🔄 Flujo de Trabajo para el Equipo

1. **Antes de empezar**: `git pull` para obtener cambios
2. **Desarrollo**: Trabaja en tu rama o feature
3. **Antes de commit**: `git status` para ver cambios
4. **Commit**: `git add .` y `git commit -m "descripción"`
5. **Subir cambios**: `git push`

