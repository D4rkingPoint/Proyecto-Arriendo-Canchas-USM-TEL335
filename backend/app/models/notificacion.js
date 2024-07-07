'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notificacion extends Model {
    static associate(models) {
      Notificacion.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
    }
  }
  Notificacion.init({
    tipo: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    mensaje: DataTypes.STRING,
    fecha_envio: DataTypes.DATEONLY,
    visto: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Notificacion',
  });
  return Notificacion;
};