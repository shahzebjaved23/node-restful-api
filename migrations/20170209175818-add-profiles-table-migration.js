'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
     queryInterface.createTable(
      "profiles", {
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
        mobile: {
          type: Sequelize.STRING,
        },
        skill_level: {
          type: Sequelize.STRING,
        },
        bio: {
          type: Sequelize.TEXT,
        },
        userId:{
          type: Sequelize.INTEGER
        }
      }
    )
  
  },

  down: function (queryInterface, Sequelize) {
    
    queryInterface.dropTable("profiles")
  }
};
