require('dotenv').config();

var Sequelize = require('sequelize');
if(!process.env.DATABASE_URL){
  var sequelize = new Sequelize("AngularDemoApp", "root", "password", {
    dialect: "mysql",
    port: 3306
  });

} else {
  var match = process.env.DATABASE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/)
  var sequelize = new Sequelize(match[5], match[1], match[2], {
    dialect:  'postgres',
    protocol: 'postgres',
    port:     match[4],
    host:     match[3],
    logging: false,
    dialectOptions: {
      ssl: true
    }})

}
sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  }, function (err) {
    console.log('Unable to connect to the database:', err);
  });

  module.exports = sequelize
