module.exports = {
  up: function (queryInterface, Sequelize) {
     queryInterface.createTable(
      "likes", {
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
    
    queryInterface.dropTable("likes")
  }
};
