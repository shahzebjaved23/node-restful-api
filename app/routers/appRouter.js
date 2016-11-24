var passport = require('passport'),
  SignInModule = require("./../modules/SignInModule"),
  signupController = require('../controllers/signupController.js'),
  signinController = require('../controllers/signinController.js');

module.exports = function(express) {
  var router = express.Router()

  var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
      return next()
    res.status(400).json({
      status: "UnAuthenticated:"
    });
  }
  router.post('/signup', signupController.signup);
  router.post('/signin', signinController.signin);
  return router
}
