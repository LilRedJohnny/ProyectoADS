const express = require('express');
const router = express.Router();
const { Receta, Usuario, Ingrediente, HistorialReceta, Sequelize } = require('../models');
const { Op } = Sequelize;

// GET /api/recetas/buscar
// Ejemplo de uso: /api/recetas/buscar?userId=1&nombre=Pollo&tiempo=30
router.get('/buscar', async (req, res) => {
  try {
    console.log("buscando recetas");
    const { busqueda, id_usuario ,filtro , filtroTiempo} = req.query;
    console.log(req.query);
    console.log(filtro);
    // 1. Obtenemos al usuario para saber sus alergias
    const usuario = await Usuario.findByPk(id_usuario);
    
    // Convertimos el string de alergias ("Mariscos, Nueces") en un array limpio
    // Ejemplo: ['mariscos', 'nueces']
    let alergiasUsuario = [];
    if (usuario && usuario.Alergias && usuario.Alergias !== "Ninguna") {
      alergiasUsuario = usuario.Alergias.split(',')
        .map(a => a.trim().toLowerCase()); 
    }

    // 2. Construimos el filtro de búsqueda para la base de datos
    
    let whereClause = {};

    if (busqueda) {
      whereClause.titulo = { [Op.like]: `%${busqueda}%` };
    }

    if (filtro && filtro !== "Todos") {
      whereClause.Categoria = filtro;
    }

    if (filtroTiempo) {
      if (filtroTiempo === "Menos de 15") {
        whereClause.Tiempo = { [Op.lt]: 15 };
      } 
      else if (filtroTiempo === "15-30") {
        whereClause.Tiempo = { [Op.between]: [15, 30] };
      } 
      else if (filtroTiempo === "30-60") {
        whereClause.Tiempo = { [Op.between]: [30, 60] };
      } 
      else if (filtroTiempo === "Más de 60") {
        whereClause.Tiempo = { [Op.gt]: 60 };
      }
    }

    // 3. Buscamos las recetas incluyendo sus ingredientes
    const recetas = await Receta.findAll({
      where: whereClause,
      include: [{
        model: Ingrediente,
        attributes: ['Nombre'], // Solo nos interesa el nombre para comparar
        through: { attributes: [] } // No necesitamos datos de la tabla intermedia aquí
      }]
    });

    // 4. LÓGICA DE EXCLUSIÓN (El filtro de alergias)
    // Filtramos el array de resultados usando JavaScript
    const recetasFiltradas = recetas.filter(receta => {
      // Miramos los ingredientes de esta receta
      const ingredientesReceta = receta.Ingredientes.map(i => i.Nombre.toLowerCase());
      
      // Verificamos si ALGÚN ingrediente coincide con ALGUNA alergia
      const esPeligrosa = ingredientesReceta.some(ingrediente => 
        alergiasUsuario.some(alergia => ingrediente.includes(alergia) || alergia.includes(ingrediente))
      );

      // Si es peligrosa devuelve false (la saca de la lista), si no, true (la deja)
      return !esPeligrosa;
    });

    res.json({
      status: 'yes',
      total: recetasFiltradas.length,
      data: recetasFiltradas
    });

  } catch (error) {
    console.error("Error buscando recetas:", error);
    res.status(500).json({ error: 'Error al buscar recetas' });
  }
});


router.get('/cargarRecetas', async (req, res) => {
  console.log("Cargando recetas");

  try {
    const recetas = await Receta.findAll({
      order: Sequelize.literal('RAND()'),
      limit: 20,
      raw:true ,
    });

    console.log("Recetas encontradas:", recetas.length);
    //console.log(recetas);
    res.json(recetas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener recetas" });
  }
});

router.post('/guardarReceta', async(req,res)=>{ //guardar en historial
  console.log("Guardando en historial...");
  try{
    const {id_usuario , id_receta}= req.body;
    const existe = await HistorialReceta.findOne({ where: { id_usuario, id_receta } });
    console.log(req.body);
    console.log(existe);
    if(existe){
      console.log("existe");
      res.json({ status: 'yes', message: 'Esta receta ya se guardo en el Historial' });
    }
    else{
      console.log("No existe");
      await HistorialReceta.create({ id_usuario:id_usuario, id_receta:id_receta,fecha_preparacion: new Date(),  });
      res.json({ status: 'yes', message: 'Guardad correctamente en Historial' });
    }
  }catch(error){
    res.status(500).json({ error: "Error al obtener recetas" });
  }


});

router.get("/historial/:id",async (req,res)=>{
  console.log("cargando historial...");

  try{
    console.log(req.params);
    const {id} =req.params;
    const historial = await HistorialReceta.findAll({
      where: { id_usuario: id },
      include: [{
        model: Receta,
        attributes: [
          'id_receta',
          'titulo',
          'Descripcion',
          'Tiempo',
          'Categoria',
          'imagen_url'
        ]
      }],
      order: [['fecha_preparacion', 'DESC']]
    });
    console.log(historial);
    res.json({status:'yes', historial});

  }catch(error){
    res.status(500).json({ error: "Error al obtener recetas" });
  }


});
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const receta = await Receta.findByPk(id, {
      include: [
        {
          model: Ingrediente,
          attributes: ["id_ingrediente", "Nombre"],
          through: {
            attributes: ["Cantidad", "Unidad"] // 🔥 AQUÍ
          }
        }
      ]
    });

    if (!receta) {
      return res.status(404).json({ message: "Receta no encontrada" });
    }

    res.json(receta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la receta" });
  }
});




module.exports = router;