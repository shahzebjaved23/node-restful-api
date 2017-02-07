'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
     
      queryInterface.bulkInsert('job_categories', [
        { title: "Computer Software", createdAt: Date.now(), updatedAt: Date.now() },
        { title: "Web & E-commerce", createdAt: Date.now(), updatedAt: Date.now() },
        { title: "Customer Service and Call Centre", createdAt: Date.now(), updatedAt: Date.now() },
        { title: "Sales", createdAt: Date.now(), updatedAt: Date.now() },
        { title: "Administrative", createdAt: Date.now(), updatedAt: Date.now()},
        { title: "Information Technology", createdAt: Date.now(), updatedAt: Date.now() },
        { title: "Advertising, Marketing & Public Relations", createdAt: Date.now(), updatedAt: Date.now()},
        { title: "Engineering ",createdAt: Date.now(), updatedAt: Date.now()},
        { title: "Education",createdAt: Date.now(), updatedAt: Date.now()},
        { title: "Production",createdAt: Date.now(), updatedAt: Date.now()},
        { title: "Accounting",createdAt: Date.now(), updatedAt: Date.now()},
        { title: "Human Resources & Recruiting",createdAt: Date.now(), updatedAt: Date.now()},
        { title: "Media",createdAt: Date.now(), updatedAt: Date.now()},
        { title: "Consulting",createdAt: Date.now(), updatedAt: Date.now() },
        { title: "Telecom",createdAt: Date.now(), updatedAt: Date.now() },
        { title: "Construction",createdAt: Date.now(), updatedAt: Date.now() },
        { title: "Supply Chain",createdAt: Date.now(), updatedAt: Date.now() },
        { title: "Retail & Wholesale",createdAt: Date.now(), updatedAt: Date.now() },
        { title: "Finance",createdAt: Date.now(), updatedAt: Date.now() },
        { title: "Financial Services",createdAt: Date.now(), updatedAt: Date.now() },
        { title: "Computer Software",createdAt: Date.now(), updatedAt: Date.now() },
        { title: "Insurance",createdAt: Date.now(), updatedAt: Date.now() },
        { title: "Autos",createdAt: Date.now(), updatedAt: Date.now() },
        { title: "NGO",createdAt: Date.now(), updatedAt: Date.now() },
        { title: "Healthcare",createdAt: Date.now(), updatedAt: Date.now() },
        { title: "Consumer",createdAt: Date.now(), updatedAt: Date.now() },
        { title: "Installation Maintenance and Repair",createdAt: Date.now(), updatedAt: Date.now() },
        { title: "Electronics",createdAt: Date.now(), updatedAt: Date.now() },
        { title: "Hospitality & Hotel",createdAt: Date.now(), updatedAt: Date.now() },
        { title: "Publishing",createdAt: Date.now(), updatedAt: Date.now() },
        { title: "Commission",createdAt: Date.now(), updatedAt: Date.now() },
        { title: "Architect",createdAt: Date.now(), updatedAt: Date.now() },
        { title: "Banking",createdAt: Date.now(), updatedAt: Date.now() },
        { title: "Business Opportunity",createdAt: Date.now(), updatedAt: Date.now() },
        { title: "Oil & Gas",createdAt: Date.now(), updatedAt: Date.now() },
        { title: "Restaurant",createdAt: Date.now(), updatedAt: Date.now() } 
      ]);

      

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
