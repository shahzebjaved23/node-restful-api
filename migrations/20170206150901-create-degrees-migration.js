'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
     queryInterface.createTable(
      "degrees", {
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
        description: {
          type: Sequelize.TEXT,
        },
        class:{
          type: Sequelize.STRING
        },
        grade: {
          type: Sequelize.STRING
        },
        field: {
          type: Sequelize.STRING
        },
        institution: {
          type: Sequelize.STRING
        },
        start_year:{
          type: Sequelize.DATE
        },
        end_year:{
          type: Sequelize.DATE
        },
        resume_id: {
          type: Sequelize.INTEGER
        }
        
      }
    )
  
  },

  down: function (queryInterface, Sequelize) {
    
    queryInterface.dropTable("degrees")
  }
};
