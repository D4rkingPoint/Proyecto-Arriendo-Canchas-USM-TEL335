'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert( "Reservations", [
      { fecha: new Date(), bloque: "7-8", userId: 1, createdAt: new Date(), updatedAt: new Date() },
    ]);
 },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete( "Reservations", null, {} );
  }
};
