'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {

  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("perfil_acesso_item", {
      id: {
        primaryKey: true, allowNull: false, autoIncrement: true, type: Sequelize.INTEGER
      },
      perfil_acesso_id: {
        allowNull: false, type: Sequelize.INTEGER, references: { model: "perfil_acesso", key: "id" }
      },
      controller: {
        allowNull: false, type: Sequelize.STRING
      },
      acao: {
        allowNull: false, type: Sequelize.STRING
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
        allowNull: false, type: Sequelize.INTEGER, references: { model: "usuario", key: "id" },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      data_modificao: { allowNull: true, type: Sequelize.DATE }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("perfil_acesso_item")
  }
};
