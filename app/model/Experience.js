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
  description:{
    type: Sequelize.TEXT
  },
  company: {
    type: Sequelize.TEXT
  },
  start_date:{
    type: Sequelize.DATE
  },
  end_date: {
    type: Sequelize.DATE
  },
  resume_id:{
    type: Sequelize.INTEGER,
    references:{
      model: "Resume",
      key: "id"
    }
  },
  job_category_id:{
    type: Sequelize.INTEGER,
    references: {
      model: "JobCategory",
      key: "id"
    }
  }
}


var options = {}

module.exports.attributes = attributes;
module.exports.options = options;
