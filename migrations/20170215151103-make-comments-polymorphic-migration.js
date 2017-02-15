'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return [
      queryInterface.removeColumn("comments","postId"),
      queryInterface.removeColumn("comments","photoId"),
      queryInterface.addColumn("comments","type",Sequelize.STRING),
      queryInterface.addColumn("comments","typeId",Sequelize.INTEGER)
    ];
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return [
      queryInterface.addColumn("comments","postId",Sequelize.INTEGER),
      queryInterface.addColumn("comments","photoId",Sequelize.INTEGER),
      queryInterface.removeColumn("comments","type"),
      queryInterface.removeColumn("comments","typeId")
    ];
  }
};
