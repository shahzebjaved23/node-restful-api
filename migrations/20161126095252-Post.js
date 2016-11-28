'use strict';
module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable("posts",{
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
      body: {
        type: Sequelize.TEXT,
      },
      userId: {
        type: Sequelize.TEXT
      }

    });

  },

  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable("posts");
  }
};
