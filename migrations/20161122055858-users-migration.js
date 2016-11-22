'use strict';
var UserMeta = require("./../app/model/User")
module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable(
      "users", UserMeta.attributes
    )
  },
  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable("users")
  }
};
