const express = require('express');
const app = express();
const puerto = 8080;

// Importamos la conexión a la BD
const { sequelize } = require("./models"); 

// --- MIDDLEWARES GLOBALES ---
app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

// --- IMPORTAR RUTAS ---
const authRutas = require('./rutas/auth');
const recetasRutas = require('./rutas/recetas');     // Buscar y filtrar
const favoritosRutas = require('./rutas/favoritos'); // Guardar recetas

// --- DEFINIR LAS RUTAS BASE ---

// 1. Auth: (Login y Registro)
// Rutas finales: POST /api/login, POST /api/registro
app.use('/api', authRutas); 

// 2. Recetas: (Búsqueda inteligente)
// Ruta final: GET /api/recetas/buscar
app.use('/api/recetas', recetasRutas); 

// 3. Favoritos: (Ver, agregar y borrar)
// Rutas finales: GET /api/favoritos/:id, POST /api/favoritos
app.use('/api/favoritos', favoritosRutas);


// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ status: 'API Recetario funcionando (Sin Caracola)' });
});

// --- INICIO DEL SERVIDOR ---
(async () => {
  try {
    await sequelize.authenticate();
    console.log('--- CONEXION EXITOSA A LA BD ---');

    // Sincroniza los modelos (Usuario, Receta, Ingrediente, Favorito, etc.)
    await sequelize.sync(); 

    app.listen(puerto, () => {
      console.log(`Servidor escuchando en puerto ${puerto}`);
    });
  } catch (error) {
    console.error('ERROR CRÍTICO AL INICIAR:', error);
  }
})();