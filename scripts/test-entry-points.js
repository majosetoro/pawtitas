#!/usr/bin/env node

// Script de prueba para verificar entry points
// Ejecutar: node scripts/test-entry-points.js

const path = require('path');
const fs = require('fs');

console.log(' [TEST] Verificando sistema de entry points\n');

// Verificar estructura de directorios
const requiredDirs = [
  'src/landing',
  'src/main-app',
  'src/shared',
  'src/entry-points',
  'src/config'
];

const requiredFiles = [
  'src/landing/App.js',
  'src/landing/index.js',
  'src/main-app/App.js',
  'src/main-app/index.js',
  'src/entry-points/index.js',
  'src/entry-points/app.js',
  'src/entry-points/landing.js',
  'src/config/app.config.js',
  'src/index.js',
  'index.js',
  'app.entry.js',
  'landing.entry.js',
  'app.config.js',
  'metro.config.js',
  'package.json'
];

console.log(' [DIRECTORIOS] Verificando estructura...');
let dirErrors = 0;
requiredDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    console.log(`   ${dir}`);
  } else {
    console.log(`   ${dir} - NO EXISTE`);
    dirErrors++;
  }
});

console.log('\n [ARCHIVOS] Verificando archivos...');
let fileErrors = 0;
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`   ${file}`);
  } else {
    console.log(`   ${file} - NO EXISTE`);
    fileErrors++;
  }
});

// Verificar scripts en package.json
console.log('\n [PACKAGE.JSON] Verificando scripts...');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const requiredScripts = [
    'start:landing',
    'start:app',
    'android:landing',
    'android:app',
    'ios:landing',
    'ios:app',
    'web:landing',
    'web:app'
  ];
  
  let scriptErrors = 0;
  requiredScripts.forEach(script => {
    if (packageJson.scripts && packageJson.scripts[script]) {
      console.log(`   ${script}`);
    } else {
      console.log(`   ${script} - NO EXISTE`);
      scriptErrors++;
    }
  });
} catch (error) {
  console.log(`   Error leyendo package.json: ${error.message}`);
  fileErrors++;
}

// Verificar metro.config.js
console.log('\n [METRO] Verificando configuración...');
try {
  const metroConfig = fs.readFileSync('metro.config.js', 'utf8');
  if (metroConfig.includes('entryPoints') || metroConfig.includes('alias')) {
    console.log('   Configuración de Metro válida');
  } else {
    console.log('   Configuración de Metro básica');
  }
} catch (error) {
  console.log(`   Error leyendo metro.config.js: ${error.message}`);
  fileErrors++;
}

// Resumen
console.log('\n [RESUMEN] Resultados de la verificación:');
console.log(`   Directorios: ${requiredDirs.length - dirErrors}/${requiredDirs.length} `);
console.log(`   Archivos: ${requiredFiles.length - fileErrors}/${requiredFiles.length} `);

if (dirErrors === 0 && fileErrors === 0) {
  console.log('\n [ÉXITO] Sistema de entry points configurado correctamente!');
  console.log('\n [USO] Comandos disponibles:');
  console.log('  npm run start:landing  - Ejecutar Landing Page');
  console.log('  npm run start:app      - Ejecutar App Principal');
  console.log('  npm run android:landing - Landing en Android');
  console.log('  npm run android:app    - App en Android');
  console.log('  npm run ios:landing    - Landing en iOS');
  console.log('  npm run ios:app        - App en iOS');
  console.log('  npm run web:landing    - Landing en Web');
  console.log('  npm run web:app        - App en Web');
} else {
  console.log('\n [ERROR] Hay problemas en la configuración:');
  console.log(`  - ${dirErrors} directorios faltantes`);
  console.log(`  - ${fileErrors} archivos faltantes`);
  console.log('\n [SOLUCIÓN] Revisa los errores arriba y corrígelos.');
}

console.log('\n [DOCUMENTACIÓN] Lee README.md para más información.');