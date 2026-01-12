module.exports = (sequelize, DataTypes) => {
  const Favorito = sequelize.define('Favorito', {
    id_favorito: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_usuario: DataTypes.INTEGER, // FK 
    id_receta: DataTypes.INTEGER,  // FK 
    fecha_guardado: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    tableName: 'Favorito',
    timestamps: false
  });

  Favorito.associate = function(models) {
    Favorito.belongsTo(models.Usuario, { foreignKey: 'id_usuario' });
    Favorito.belongsTo(models.Receta, { foreignKey: 'id_receta' });
  };

  return Favorito;
};