"use strict";
var Sequelize = require('sequelize');

var attributes = { 
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  createdAt: {
    type: Sequelize.DATE
  },
  updatedAt: {
    type: Sequelize.DATE
  },
  jobId: {
    type: Sequelize.INTEGER,
    references: {
      model: "Job",
      key: "id"
    }
  },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: "User",
      key: "id"
    }
  }
}


var options = {}

module.exports.attributes = attributes;
module.exports.options = options;
