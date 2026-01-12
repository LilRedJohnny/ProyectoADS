module.exports = (sequelize, DataTypes) => {
  const Ingrediente = sequelize.define('Ingrediente', {
    id_ingrediente: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true
     },
    Nombre: DataTypes.STRING
     }, 
  {
    tableName: 'Ingrediente',
    timestamps: false
  });

  Ingrediente.associate = function(models) {
    Ingrediente.belongsToMany(models.Receta, { 
      through: models.IngredienteReceta, 
      foreignKey: 'id_ingrediente' 
    });
    
    

    
  };

  return Ingrediente;
};