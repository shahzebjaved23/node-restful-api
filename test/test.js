var req = require("request");
var eventsController = require("./app/controllers/eventsController.js");

var assert = require('assert');

describe('eventsController', function() {
  describe('#getUserEvents', function() {
    it('it should get all the events created by the user', function() {

      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});

