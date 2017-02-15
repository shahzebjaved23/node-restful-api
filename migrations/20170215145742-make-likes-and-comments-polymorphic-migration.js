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
      queryInterface.removeColumn("likes","postId"),
      queryInterface.removeColumn("likes","photoId"),
      queryInterface.addColumn("likes","type",Sequelize.STRING),
      queryInterface.addColumn("likes","typeId",Sequelize.INTEGER)
    ]
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return [
      queryInterface.addColumn("likes","postId"),
      queryInterface.addColumn("likes","photoId"),
      queryInterface.removeColumn("likes","type",Sequelize.STRING),
      queryInterface.removeColumn("likes","typeId",Sequelize.INTEGER)
    ]
  }
};
