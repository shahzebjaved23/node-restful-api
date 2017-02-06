'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
     queryInterface.createTable(
      "resumes", {
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
        name: {
          type: Sequelize.STRING,
        },
        title: {
          type: Sequelize.STRING,
        },
        summary: {
          type: Sequelize.TEXT,
        },
        industry: {
          type: Sequelize.STRING
        },
        userId:{
          type: Sequelize.INTEGER
        }
        
      }
    )
  
  },

  down: function (queryInterface, Sequelize) {
    
    queryInterface.dropTable("resumes")
  }
};
