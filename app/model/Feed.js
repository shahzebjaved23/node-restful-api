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
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: "User",
      key: "id"
    }
  },
  feedType:{
    type: Sequelize.STRING
  },
  feedTypeId: {
    type: Sequelize.INTEGER
  },
  url:{
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.STRING
  },
  albumId: {
    type: Sequelize.STRING
  },
  photoUrl: {
    type: Sequelize.STRING
  },
  videoUrl :{
    type: Sequelize.STRING
  },
  thumbnailUrl: {
    type: Sequelize.STRING
  },
  commentBody:{
    type: Sequelize.TEXT
  }
}


var options = {}

module.exports.attributes = attributes;
module.exports.options = options;
