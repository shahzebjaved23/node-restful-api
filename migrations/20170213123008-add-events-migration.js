'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
     queryInterface.createTable(
      "events", {
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
        title: {
          type: Sequelize.STRING,
        },
        location: {
          type: Sequelize.STRING,
        },
        description:{
          type: Sequelize.TEXT
        },
        userId: {
          type: Sequelize.INTEGER
        }
      }
    )
  
  },

  down: function (queryInterface, Sequelize) {
    
    queryInterface.dropTable("events")
  }
};
