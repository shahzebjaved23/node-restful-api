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
  }
  ,
  summary: {
    type: Sequelize.TEXT,
  },
  company_name: {
    type: Sequelize.STRING,
  },
  job_category_id: {
    type: Sequelize.INTEGER,
  },
  userId:{
    type: Sequelize.INTEGER
  }
}


var options = {}

module.exports.attributes = attributes;
module.exports.options = options;
