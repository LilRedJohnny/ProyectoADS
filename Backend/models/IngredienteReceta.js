module.exports = (sequelize, DataTypes) => {
  const IngredienteReceta = sequelize.define('IngredienteReceta', {
    id_ingr_rec: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true },
    id_receta: DataTypes.INTEGER,     
    id_ingrediente: DataTypes.INTEGER, 
    Cantidad: DataTypes.FLOAT,
    Unidad: DataTypes.STRING
  }, {
    tableName: 'IngredienteReceta',
    timestamps: false
  });

  IngredienteReceta.associate = function(models) {
    IngredienteReceta.belongsTo(models.Receta, { foreignKey: 'id_receta' });
    IngredienteReceta.belongsTo(models.Ingrediente, { foreignKey: 'id_ingrediente' });
  };

  return IngredienteReceta;
};