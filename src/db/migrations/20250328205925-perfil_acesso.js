'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("perfil_acesso", {
      id: {
        primaryKey: true, allowNull: false, autoIncrement: true, type: Sequelize.INTEGER
      },
      nome: {
        allowNull: false, type: Sequelize.STRING
      },
      ativo: {
        allowNull: false, type: Sequelize.BOOLEAN
      },
      descricao: {
        allowNull: true, type: Sequelize.STRING
      },
      data_criacao: {
        allowNull: false, type: Sequelize.DATE
      },
      usuario_criacao: {
        allowNull: true, type: Sequelize.INTEGER, references: { model: "usuario", key: "id" },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      usuario_modificacao: {
        allowNull: true, type: Sequelize.INTEGER, references: { model: "usuario", key: "id" },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      data_modificacao: { allowNull: true, type: Sequelize.DATE }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("perfil_acesso")
  }
};
