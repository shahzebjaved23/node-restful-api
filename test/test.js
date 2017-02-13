var req = require("request");
var eventsController = require("../app/controllers/eventsController.js");
var DatabaseCleaner = require('database-cleaner'); 
var connection = require('./mysql_connection.js');



var assert = require('assert');

describe('eventsController', function() {
  
  before(function(){
  	var databasecleaner = new DatabaseCleaner("mysql")

  });

  describe('#getUserEvents', function() {
    it('it should get all the events created by the user', function() {

      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });

});

