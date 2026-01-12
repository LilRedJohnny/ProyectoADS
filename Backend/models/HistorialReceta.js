module.exports = (sequelize, DataTypes) => {
  const HistorialReceta = sequelize.define('HistorialReceta', {
    id_historial: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_receta: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fecha_preparacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'HistorialReceta',
    timestamps: false
  });

  HistorialReceta.associate = (models) => {
    HistorialReceta.belongsTo(models.Usuario, { foreignKey: 'id_usuario' });
    HistorialReceta.belongsTo(models.Receta, { foreignKey: 'id_receta' });
  };

  return HistorialReceta;
};
