'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
     queryInterface.createTable(
      "users_events", {
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
        eventId: {
          type: Sequelize.INTEGER
        },
        status: {
          type: Sequelize.STRING
        }
      }
    )
  
  },

  down: function (queryInterface, Sequelize) {
    
    queryInterface.dropTable("users_events")
  }
};
