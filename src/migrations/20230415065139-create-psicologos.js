'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('psicologos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      nome: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(45),
        allowNull: false,
        unique: 'email',
      },
      senha: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      apresentacao: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('psicologos');
  },
};
