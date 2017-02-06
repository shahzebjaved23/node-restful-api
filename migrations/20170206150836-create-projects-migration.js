'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
     queryInterface.createTable(
      "projects", {
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
        description: {
          type: Sequelize.TEXT,
        },
        url:{
          type: Sequelize.STRING
        },
        start_date:{
          type: Sequelize.DATE
        },
        end_date: {
          type: Sequelize.DATE
        },
        resume_id: {
          type: Sequelize.INTEGER
        }
        
      }
    )
  
  },

  down: function (queryInterface, Sequelize) {
    
    queryInterface.dropTable("projects")
  }
};
