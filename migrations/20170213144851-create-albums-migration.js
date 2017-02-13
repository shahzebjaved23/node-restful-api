'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
     queryInterface.createTable(
      "albums", {
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
        userId: {
          type: Sequelize.INTEGER
        },
        name: {
          type: Sequelize.STRING
        }
      }
    )
  
  },

  down: function (queryInterface, Sequelize) {
    
    queryInterface.dropTable("albums")
  }
};
