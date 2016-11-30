'use strict';
var UserMeta = require("./../app/model/User")
module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable(
      "users", {
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
        username: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
          validate: {
            is: /^[a-z0-9\_\-]+$/i,
          }
        },
        email: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false,
          validate: {
            isEmail: true
          }
        },
        gender: {
          type: Sequelize.STRING,
        },
        firstName: {
          type: Sequelize.STRING,
        },
        lastName: {
          type: Sequelize.STRING,
        },
        password: {
          type: Sequelize.STRING,
        },
        salt: {
          type: Sequelize.STRING
        }
      }
    )
  },
  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable("users")
  }
};
