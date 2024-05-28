'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany( models.Reservation, {
        foreignKey: 'userId',
        as: 'reservations',
      });
      User.hasMany(models.Notificacion, {
        foreignKey: 'userId',
        as: 'notificaciones',
      });
    }
  }
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    disable: DataTypes.BOOLEAN,
    is_admin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};