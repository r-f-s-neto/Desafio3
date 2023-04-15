'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('atendimentos', {
      pacientes_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'pacientes',
          key: 'id',
        },
      },
      psicologos_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'psicologos',
          key: 'id',
        },
      },
      data: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      observacao: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable('atendimentos');
  },
};
