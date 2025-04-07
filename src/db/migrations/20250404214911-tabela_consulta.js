'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("consulta", {
      id : {
        type : Sequelize.INTEGER,
        allowNull : false,
        primaryKey : true,
        autoIncrement : true
      },
      descricao : {
        type : Sequelize.STRING,
        allowNull : false
      },
      preco : {
        type : Sequelize.DECIMAL,
        allowNull : false
      },
      cliente_id : {
        type : Sequelize.INTEGER,
        allowNull : false,
        references : {
          model : "cliente",
          key : "id"
        },
        onDelete : "CASCADE",
        onUpdate : "CASCADE"
      },
      cancelado : {
        type : Sequelize.BOOLEAN,
        allowNull : true
      },
      horario : {
        type : Sequelize.DATE,
        unique : true,
        allowNull : true
      },
      data_criacao : {
        type : Sequelize.DATE,
        allowNull : false
      },
      data_modificacao : {
        type : Sequelize.DATE,
        allowNull : true
      },
      usuario_criacao : {
        type : Sequelize.INTEGER,
        allowNull : false,
        references : {
          model: "usuario",
          key : "id"
        },
        onUpdate : "CASCADE"
      },
      usuario_modificacao : {
        type : Sequelize.INTEGER,
        allowNull : true,
        references : {
          model: "usuario",
          key : "id"
        },
        onUpdate : "CASCADE"
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("consulta")
  }
};
