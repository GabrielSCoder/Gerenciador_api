'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("consulta", "hora_marcada", {type : Sequelize.BOOLEAN, defaultValue : false, allowNull : false})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("consulta", "hora_marcada")
  }
};
