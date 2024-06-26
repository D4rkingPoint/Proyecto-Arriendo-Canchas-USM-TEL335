'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Horarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      canchaId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Canchas',
          key: 'id',
          as: 'canchaId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      dia: {
        type: Sequelize.STRING
      },
      bloque: {
        type: Sequelize.STRING
      },
      estado: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Horarios');
  }
};