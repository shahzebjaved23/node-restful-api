'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
     queryInterface.createTable(
      "experience", {
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
        company: {
          type: Sequelize.STRING,
        },
        start_date:{
          type: Sequelize.DATE
        },
        end_date:{
          type: Sequelize.DATE
        },
        resume_id:{
          type: Sequelize.INTEGER
        }
        job_category_id: {
          type: Sequelize.INTEGER
        }
        
      }
    )
  
  },

  down: function (queryInterface, Sequelize) {
    
    queryInterface.dropTable("experience")
  }
};
