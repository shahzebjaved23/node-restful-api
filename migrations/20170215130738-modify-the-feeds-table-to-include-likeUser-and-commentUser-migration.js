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
      queryInterface.removeColumn("feeds","photoUrl"),
      queryInterface.removeColumn("feeds","videoUrl"),
      queryInterface.addColumn("feeds","url",Sequelize.STRING),
      queryInterface.addColumn("feeds","commentUserId",Sequelize.INTEGER),
      queryInterface.addColumn("feeds","likeUserId",Sequelize.INTEGER),
      queryInterface.renameColumn("feeds","commentBody","body",Sequelize.TEXT)
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
      queryInterface.addColumn("feeds","photoUrl",Sequelize.STRING),
      queryInterface.addColumn("feeds","videoUrl",Sequelize.STRING),
      queryInterface.removeColumn("feeds","url",Sequelize.STRING),
      queryInterface.removeColumn("feeds","commentUserId",Sequelize.INTEGER),
      queryInterface.removeColumn("feeds","likeUserId",Sequelize.INTEGER)
    ];
  }
};
