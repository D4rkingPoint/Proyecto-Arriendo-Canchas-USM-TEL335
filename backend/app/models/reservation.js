'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    static associate(models) {
      Reservation.belongsTo( models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE',
     } );
     Reservation.belongsTo(models.Cancha, {
      foreignKey: 'canchaId',
      as: 'cancha',
      onDelete: 'CASCADE',
    });
    }
  }
  Reservation.init({
    fecha: DataTypes.DATEONLY,
    bloque: DataTypes.STRING,
    estado: DataTypes.STRING,
    confirmationToken: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Reservation',
  });
  return Reservation;
};