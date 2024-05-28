'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert( "Users", [
       { email: "admin@admin.cl", password: "12345",nombre:"Admin",apellido:"Admin", disable:false, is_admin:true,  createdAt: new Date(), updatedAt: new Date() }
    ] );
 },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete( "Users", null, {} );
 }
};
