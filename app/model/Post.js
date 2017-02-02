"use strict";
var Sequelize = require('sequelize')

var attributes = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  createdAt: {
    type: Sequelize.DATE
  },
  body: {
    type: Sequelize.TEXT
  },
  updatedAt: {
    type: Sequelize.DATE
  },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: "User",
      key: "id"
    }
  }
}

var options = {
  freezeTableName: true
}

module.exports.attributes = attributes
module.exports.options = options
