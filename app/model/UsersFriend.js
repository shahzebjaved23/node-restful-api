var Sequelize = require('sequelize')

var attributes  = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: "User",
      key: "id"
    }
  },
  friendId: {
    type: Sequelize.INTEGER,
    references: { 
      model: "User",
      key: "id"
    }
  }
}

var options = {}

module.exports.attributes = attributes
module.exports.options = options
