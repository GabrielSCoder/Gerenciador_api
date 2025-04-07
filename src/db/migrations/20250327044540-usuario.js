'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("usuario", {
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
      email : {
        type : Sequelize.STRING,
        unique : true,
        allowNull : false
      },
      senha : {
        type : Sequelize.STRING,
        allowNull : false
      },
      ativo : {
        type : Sequelize.BOOLEAN,
        allowNull : false,
        defaultValue : true
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
      }
    })
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.dropTable("usuario")
  }
};
