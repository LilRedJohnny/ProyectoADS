module.exports = (sequelize, DataTypes) => {
  const Receta = sequelize.define('Receta', {
    id_receta: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    titulo:DataTypes.TEXT,
    Descripcion: DataTypes.TEXT,
    Instrucciones: DataTypes.TEXT,
    Categoria: DataTypes.STRING,
    Tiempo: DataTypes.INTEGER,
    Utensilios: DataTypes.STRING,
    porciones:DataTypes.STRING,
    imagen_url: DataTypes.STRING
  }, {
    tableName: 'Receta',
    timestamps: false
  });

  Receta.associate = function(models) {

    Receta.belongsToMany(models.Ingrediente, { 
      through: models.IngredienteReceta, 
      foreignKey: 'id_receta' 
    });
    
    Receta.hasMany(models.Favorito, { foreignKey: 'id_receta' });
    

    
  };

  return Receta;
};