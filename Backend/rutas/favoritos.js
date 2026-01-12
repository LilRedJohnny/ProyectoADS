const express = require('express');
const router = express.Router();
const { Favorito, Receta } = require('../models');

// GET /api/favoritos/:usuarioId -> Ver mis favoritos
router.get('/:id_usuario', async (req, res) => {
  try {
    console.log("Buscando favoritos");
    const { id_usuario } = req.params;
    
    const misFavoritos = await Favorito.findAll({
      where: { id_usuario: id_usuario },
      include: [{
        model: Receta, // Incluimos la info de la receta para mostrarla en el front
        attributes: ['id_receta','titulo', 'Descripcion', 'Tiempo', 'Categoria','imagen_url']
      }]
    });
    const recetasLimpias = misFavoritos.map(
  fav => fav.Recetum.dataValues
);
    
    console.log(recetasLimpias);
    //console.log(JSON.stringify(misFavoritos, null, 2));
    res.json({ status: 'yes', data: recetasLimpias });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener favoritos' });
  }
});

// POST /api/favoritos -> Agregar a favoritos
router.post('/', async (req, res) => {
  console.log("Guardando en favoritos");
  try {
    const { id_usuario, id_receta } = req.body;

    // Verificar si ya existe para no duplicar
    const existe = await Favorito.findOne({ where: { id_usuario, id_receta } });
    if (existe) {
      await existe.destroy();
       res.json({ status: 'yes', message: 'Eliminado de favoritos ❌' });
    }
    else{
      await Favorito.create({ id_usuario, id_receta });
     res.json({ status: 'yes', message: 'Agregado a favoritos ❤️' });
    }

    

  } catch (error) {
    res.status(500).json({ error: 'Error al guardar favorito' });
  }
});

// DELETE /api/favoritos/:id -> Eliminar de favoritos
// Ojo: aquí el :id es el id_favorito, o puedes hacerlo por usuario/receta
router.delete('/:id', async (req, res) => {
  try {
    await Favorito.destroy({ where: { id_favorito: req.params.id } });
    res.json({ status: 'yes', message: 'Eliminado de favoritos' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar' });
  }
});

module.exports = router;