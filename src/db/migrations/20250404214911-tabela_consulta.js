'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("consulta", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      descricao: {
        type: Sequelize.STRING,
        allowNull: false
      },
      preco: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      cliente_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "cliente",
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 1
      },
      horario: {
        type: Sequelize.DATE,
        unique: true,
        allowNull: true
      },
      tipo: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      dente_afetado: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      procedimento: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      forma_pagamento: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      data_criacao: {
        type: Sequelize.DATE,
        allowNull: false
      },
      data_modificacao: {
        type: Sequelize.DATE,
        allowNull: true
      },
      pago : {
        type: Sequelize.BOOLEAN,
        allowNull : false,
        defaultValue : false
      },
      observacoes : {
        type : Sequelize.TEXT,
        allowNull : true
      },
      profissional_id : {
        type : Sequelize.INTEGER,
        allowNull : false,
        references : {
          model : "usuario",
          key : "id"
        },
        onUpdate : "CASCADE"
      },
      usuario_criacao: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "usuario",
          key: "id"
        },
        onUpdate: "CASCADE"
      },
      usuario_modificacao: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "usuario",
          key: "id"
        },
        onUpdate: "CASCADE"
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("consulta")
  }
};
