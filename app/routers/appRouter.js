var passport = require('passport'),
  jwt = require('express-jwt'),
  SignInModule = require("./../modules/SignInModule"),
  signupController = require('../controllers/signupController.js'),
  signinController = require('../controllers/signinController.js'),
  usersController = require('../controllers/usersController.js'),
  postsController = require('../controllers/postsController.js');
  require("dotenv").config()

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
  router.get('/posts', jwt({secret: process.env.SECRET_TOKEN}), postsController.index);
  router.post('/posts/add', jwt({secret: process.env.SECRET_TOKEN}), postsController.add);
  router.put('/users/:id', jwt({secret: process.env.SECRET_TOKEN}), usersController.update);
  return router
}
