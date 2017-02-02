"use strict";
var Sequelize = require('sequelize')

var attributes = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  full_name: {
    type: Sequelize.VIRTUAL,
    get: function(val) {
      return this.get("firstName") + " " + this.get("lastName");
    }
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
  },
  image: {
    type: Sequelize.STRING
  },
  profile_image_name: {
    type: Sequelize.VIRTUAL,
    set: function(val){
      this.setDataValue('image', val)
    }
  },
  profile_image: {
    type: Sequelize.VIRTUAL,
    get: function(){
      var fileName = "public/uploads/users/" + this.get("id") + "/" + this.get("image");
      return `https://${process.env.SHAFUL_S3_BUCKET}.s3.amazonaws.com/${fileName}`
    }
  }
}

var options = {
  freezeTableName: true,
  instanceMethods: {
    toJSON: function() {
      var values = Object.assign({}, this.get());
      delete values.password;
      delete values.salt;
      return values;
    }
  }
}

module.exports.attributes = attributes
module.exports.options = options
