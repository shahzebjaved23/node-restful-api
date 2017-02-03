module.exports = {
  up: function (queryInterface, Sequelize) {
     queryInterface.createTable(
      "comments", {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        createdAt: {
          type: Sequelize.DATE
        },
        updatedAt: {
          type: Sequelize.DATE
        },
        body:{
          type: Sequelize.TEXT
        },
        userId: {
          type: Sequelize.INTEGER,
        },
        postId: {
          type: Sequelize.INTEGER,
        },
        photoId: {
          type: Sequelize.INTEGER,
        }
        
      }
    )
  
  },

  down: function (queryInterface, Sequelize) {
    
    queryInterface.dropTable("comments")
  }
};
