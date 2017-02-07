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
  title: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  },
  class: {
    type: Sequelize.STRING
  },
  grade: {
    type: Sequelize.STRING
  },
  field: {
    type: Sequelize.STRING
  },
  institution:{
    type: Sequelize.STRING
  },
  start_year:{
    type: Sequelize.DATE
  },
  end_year:{
    type: Sequelize.DATE
  },
  resume_id:{
    type: Sequelize.INTEGER,
    references:{
      model: "Resume",
      key: "id"
    }
  }
}


var options = {}

module.exports.attributes = attributes;
module.exports.options = options;
