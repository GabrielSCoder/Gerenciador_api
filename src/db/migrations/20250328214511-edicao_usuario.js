'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("usuario", "perfil_acesso_id", {type : Sequelize.INTEGER, allowNull : true, references : {model : "perfil_acesso", key : "id"}})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("usuario", "perfil_acesso_id")
  }
};
