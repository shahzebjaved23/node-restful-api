require('dotenv').config();

var Sequelize = require('sequelize');
console.log("8888888888888****");
console.log("8888888888888****");
console.log("8888888888888****");
console.log("8888888888888****");
console.log("8888888888888****");
console.log("8888888888888****");
console.log("8888888888888****");
console.log(process.env);
if(process.env.DATABASE_URL){
  var sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect:  'postgres',
    protocol: 'postgres',
    logging:  true //false
  })
} else {
  var sequelize = new Sequelize("AngularDemoApp", "root", "password", {
    dialect: "mysql",
    port: 3306
  });
}
sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  }, function (err) {
    console.log('Unable to connect to the database:', err);
  });

  module.exports = sequelize
