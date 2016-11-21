var Sequelize = require('sequelize'),
  sequelize = new Sequelize("AngularDemoApp", "root", "password", {
    dialect: "mysql",
    port: 3306
  });

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  }, function (err) { 
    console.log('Unable to connect to the database:', err);
  });

module.exports = sequelize
