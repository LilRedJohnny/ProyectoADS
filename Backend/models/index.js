
const Sequelize = require('sequelize');
const sequelize = require('../sequelize.js'); 


const models = {
  Usuario: require('./Usuario')(sequelize, Sequelize.DataTypes),
  Receta: require('./Receta')(sequelize, Sequelize.DataTypes),
  Ingrediente: require('./Ingrediente')(sequelize, Sequelize.DataTypes),
  IngredienteReceta: require('./IngredienteReceta')(sequelize, Sequelize.DataTypes),
  HistorialReceta:require('./HistorialReceta')(sequelize, Sequelize.DataTypes),
  Favorito: require('./Favorito')(sequelize, Sequelize.DataTypes),
 
};

// se ejecutan las asociaciones
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;