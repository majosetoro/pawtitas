# 🐾 Pawtitas

## 🚀 Configuración Inicial

### 📋 Prerrequisitos OBLIGATORIOS
- **Node.js** (versión 18 o superior) - [Descargar aquí](https://nodejs.org/)
- **Expo CLI** instalado globalmente: `npm install -g @expo/cli`

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

#### 4. MySQL

#### 5. Verificar que todo funciona
```bash
npx expo start
```

### ⚠️ Archivos Importantes

- **`.env`** - Variables de entorno (opcional, NO se sube a Git)

### 🔒 Seguridad



## 🔀 Sistema de Entry Points

El proyecto está configurado con múltiples entry points para permitir el desarrollo simultáneo de la landing page y de la app.

### 📱 Entry Points Disponibles

- **Landing Page**: Página de bienvenida y panel de administrador
- **App Principal**: Aplicación principal con todas las funcionalidades

### 🛠️ Cómo Funciona

El sistema utiliza variables de entorno y configuración dinámica de Expo para cargar el entry point correcto:

1. El archivo `index.js` actúa como router
2. El archivo `app.config.js` configura dinámicamente la app según el entry point
3. Los archivos `app.entry.js` y `landing.entry.js` son los puntos de entrada específicos

### 🚀 Comandos de Ejecución

#### Comandos Principales
```bash
# Iniciar desarrollo (por default se inicia la APP)
npx expo start

# Verificar sistema de entry points
npm run test:entry-points

# Limpiar cache y reiniciar
npx expo start --clear
```

#### Comandos Específicos por Entry Point

**Para la Landing Page:**
```bash
npm run start:landing      # Desarrollo general
npm run android:landing   # Android
npm run ios:landing       # iOS
npm run web:landing       # Web
```

**Para la App Principal:**
```bash
npm run start:app         # Desarrollo general
npm run android:app       # Android
npm run ios:app           # iOS
npm run web:app           # Web
```

### 🔧 Verificación del Sistema

Para verificar que el sistema de entry points está configurado correctamente:
```bash
npm run test:entry-points
```

### ⚠️ Solución de Problemas con Entry Points

Si tienes problemas con los entry points:

1. Verifica que expo-constants esté instalado: `npm install expo-constants`
2. Asegúrate de que las variables de entorno se pasan correctamente
3. Ejecuta `npm run test:entry-points` para verificar la configuración
4. Comprueba que los archivos de configuración no tengan errores

## 📱 Estructura del Proyecto

```
pawtitas/
├── assets/                        ← Imágenes y recursos globales 
├── public/                        ← Archivos públicos para web
│   ├── favicon.ico                ← Favicon para web
├── scripts/                       ← Scripts de utilidad
│   ├── test-entry-points.js       ← Verifica configuración de entry points
├── src/
│   ├── app/                       ← Código de la aplicación principal
│   │   ├── App.js                 ← Componente principal de la app
│   │   ├── assets/                ← Recursos específicos de la app
│   │   ├── components/            ← Componentes de la app
│   │   ├── navigation/            ← Navegación de la app
│   │   ├── screens/               ← Pantallas de la app
│   │   └── index.js               ← Entry point de la app
│   ├── config/                    ← Configuraciones
│   │   └── app.config.js          ← Configuración dinámica de Expo
│   ├── entry-point-manager.js     ← Gestor de entry points
│   ├── entry-points/              ← Definición de entry points
│   │   ├── app.js                 ← Configuración de app entry point
│   │   ├── index.js               ← Exportación de entry points
│   │   └── landing.js             ← Configuración de landing entry point
│   ├── landing/                   ← Código de la landing page
│   │   ├── App.js                 ← Componente principal de la landing
│   │   ├── components/            ← Componentes de la landing
│   │   ├── navigation/            ← Navegación de la landing
│   │   ├── screens/               ← Pantallas de la landing
│   │   │   ├── AdminPanel/        ← Panel de administrador
│   │   │   └── LandingPage/       ← Página principal de landing
│   │   └── index.js               ← Entry point de la landing
│   └── shared/                    ← Código compartido entre app y landing
│       ├── components/            ← Componentes compartidos
│       │   └── index.js           ← Exportación de componentes
│       ├── styles/                ← Estilos compartidos
│       │   └── index.js           ← Exportación de estilos
│       ├── utils/                 ← Utilidades compartidas
│       │   └── index.js           ← Exportación de utilidades
│       └── index.js               ← Exportación de módulos compartidos
├── app.config.js                  ← Referencia a configuración en src/config
├── app.entry.js                   ← Entry point específico para la app
├── app.json                       ← Configuración de Expo
├── index.js                       ← Router de entry points
├── landing.entry.js               ← Entry point específico para la landing
├── metro.config.js                ← Configuración de Metro bundler
└── README.md                      ← Este archivo
```

## 🆘 Problemas Comunes y Soluciones

**Error: "Module not found"**
- Ejecuta `npm install` para instalar dependencias
- Verifica que estés en la carpeta correcta

**Error: "Expo not found"**
- Instala Expo CLI: `npm install -g @expo/cli`
- Verifica que Node.js esté instalado correctamente

## 🚀 Comandos Útiles Adicionales

```bash
# Instalar nuevas dependencias
npm install [nombre-paquete]

# Ver estado de Git
git status

# Ver logs de la app
npx expo logs
```

## 📞 Soporte

- **Documentación Expo**: [https://docs.expo.dev/](https://docs.expo.dev/)

## 🔄 Flujo de Trabajo para el Equipo

1. **Antes de empezar**: `git pull` para obtener cambios
2. **Desarrollo**: Trabaja en tu rama o feature
3. **Antes de commit**: `git status` para ver cambios
4. **Commit**: `git add .` y `git commit -m "descripción"`
5. **Subir cambios**: `git push`

## 🌿 Comandos Git para Gestión de Ramas

#### Crear y cambiar a una nueva rama
```bash
# Cambiar a una nueva rama
git checkout nombre-de-rama
```

#### Cambiar entre ramas existentes
```bash
# Método tradicional
git checkout nombre-de-rama
```

#### Obtener cambios de otra rama
```bash
# Traer cambios de main a tu rama actual
git pull origin main

# Si tienes conflictos, resuélvelos y luego:
git add .
git commit -m "Merge cambios de main"
```

#### Fusionar ramas
```bash
# Primero, cambia a la rama destino (por ejemplo, main)
git checkout main

# Luego, fusiona la rama de feature
git merge nombre-de-rama

# Si hay conflictos, resuélvelos y luego:
git add .
git commit -m "Resuelve conflictos de merge"
```