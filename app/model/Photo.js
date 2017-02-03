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
  filePath: {
    type: Sequelize.STRING,
  },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: "User",
      key: "id"
    }
  },
  publicUrl: {
    type: Sequelize.VIRTUAL,
    get: function(){
      var fileName = `public/uploads/photos/${this.get('id')}/${this.get('filePath')}`
      return `https://${process.env.SHAFUL_S3_BUCKET}.s3.amazonaws.com/${fileName}`
    }
  }
}


var options = {}

module.exports.attributes = attributes;
module.exports.options = options;

 