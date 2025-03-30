'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("sessao", {
      id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        allowNull : false,
        autoIncrement : true
      },
      usuario_id : {
        type : Sequelize.INTEGER,
        allowNull : false,
        references : {
          model : "usuario",
          key : "id"
        },
        onUpdate : 'CASCADE',
        onDelete : 'CASCADE'
      },
      hmac : {
        type : Sequelize.STRING,
        allowNull : false
      },
      token : {
        type : Sequelize.STRING,
        allowNull : false,
        unique: true
      },
      data_criacao : {
        type : Sequelize.DATE,
        allowNull : false
      },
      data_extincao : {
        type : Sequelize.DATE,
        allowNull: true
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("sessao")
  }
};
