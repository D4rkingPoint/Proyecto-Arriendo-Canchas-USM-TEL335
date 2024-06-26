'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Horario extends Model {
    static associate(models) {
      Horario.belongsTo(models.Cancha, {
        foreignKey: 'canchaId',
        as: 'cancha',
      });
    }
  }
  Horario.init({
    canchaId: DataTypes.INTEGER,
    dia: DataTypes.STRING,
    bloque: DataTypes.STRING,
    estado: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Horario',
  });
  return Horario;
};