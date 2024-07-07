'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reservations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fecha: {
        type: Sequelize.DATEONLY
      },
      bloque: {
        type: Sequelize.STRING
      },
      estado: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
           model: "Users",
           key: "id",
           as: "userId"
        }
      },
      canchaId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Canchas",
          key: "id",
          as: "canchaId"
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Reservations');
  }
};