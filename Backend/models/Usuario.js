
module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define(
    'Usuario',
    {
      id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      edad:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      nombre_usuario: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      correo: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
      },
      contraseña: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tipo_alimentacion: {
        type: DataTypes.STRING(100),
      },
      Padecimientos: {
        type: DataTypes.STRING(250),
      },
      Alergias: {
        type: DataTypes.STRING(250),
      },
      
    },
    {
      tableName: 'usuario',
      timestamps: false,
    }
  );

  Usuario.associate = function(models) {
    Usuario.hasMany(models.Favorito, {
      foreignKey: 'id_usuario',
    });
    
  };

  return Usuario;
};
