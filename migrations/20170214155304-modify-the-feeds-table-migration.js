'use strict';
// modify the feed table to contain both the photo and video attributes

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return [
            queryInterface.addColumn("feeds","albumId",Sequelize.INTEGER),
            queryInterface.addColumn("feeds","photoUrl",Sequelize.STRING),
            queryInterface.addColumn("feeds","videoUrl",Sequelize.STRING)
      ]
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
