'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cancha extends Model {
    static associate(models) {
      Cancha.hasMany(models.Reservation, {
        foreignKey: 'canchaId',
        as: 'reservations',
      });
      Cancha.hasMany(models.Horario, {
        foreignKey: 'canchaId',
        as: 'horarios',
      });
    }
  }
  Cancha.init({
    nombre: DataTypes.STRING,
    tipo: DataTypes.STRING,
    ubicacion: DataTypes.STRING,
    fotografia: DataTypes.STRING,
    estado_disponibilidad: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Cancha',
  });
  return Cancha;
};