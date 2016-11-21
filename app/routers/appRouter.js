var passport = require('passport'),
    const jwt = require('jsonwebtoken'),
    signupController = require('../controllers/signupController.js')

module.exports = function(express) {
  var router = express.Router()

  var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
      return next()
    res.status(400).json({
      status: "UnAuthenticated:"
    });
  }
  
  router.get('/signup', signupController.show)
  router.post('/signup', signupController.signup)

  return router
}
