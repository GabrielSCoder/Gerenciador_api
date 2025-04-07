'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("cliente", {
      id : {
        allowNull : false,
        primaryKey : true,
        autoIncrement : true,
        type : Sequelize.INTEGER
      },
      nome : {
        allowNull : false,
        type : Sequelize.STRING
      },
      endereco : {
        type : Sequelize.STRING,
        unique : false,
        allowNull : false
      },
      numero : {
        type : Sequelize.STRING,
        allowNull : false
      },
      indentificacao : {
        type : Sequelize.STRING,
        allowNull : true,
        unique : true
      },
      telefone : {
        type : Sequelize.STRING,
        allowNull : true
      },
      telefone2 : {
        type : Sequelize.STRING,
        allowNull : true
      },
      data_nascimento : {
        type : Sequelize.DATEONLY,
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
        references : {model : "usuario", key : "id"}
      },
      usuario_modificacao : {
        type : Sequelize.INTEGER,
        allowNull : true,
        references : {model : "usuario", key : "id"}
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("cliente")
  }
};
