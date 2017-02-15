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
  body: {
    type: Sequelize.TEXT
  }
  ,
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: "User",
      key: "id"
    }
  },
  type: {
    type: Sequelize.STRING,
  },
  typeId: {
    type: Sequelize.INTEGER,
  }
}


var options = {}

module.exports.attributes = attributes;
module.exports.options = options;
