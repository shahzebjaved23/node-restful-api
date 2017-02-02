"use strict";
var passport = require('passport'),
  jwt = require('express-jwt'),
  SignInModule = require("./../modules/SignInModule"),
  signupController = require('../controllers/signupController.js'),
  signinController = require('../controllers/signinController.js'),
  usersController = require('../controllers/usersController.js'),
  postsController = require('../controllers/postsController.js'),
  photosController = require('../controllers/photosController.js'),
  friendsController = require('../controllers/friendsController.js'),
  videosController = require('../controllers/videosController.js'),
  mediaController = require('../controllers/mediaController.js');
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
  router.post('/photos', jwt({secret: process.env.SECRET_TOKEN}), photosController.create);
  
  router.get('/photos', jwt({secret: process.env.SECRET_TOKEN}), photosController.index);
  router.get('/friends', jwt({secret: process.env.SECRET_TOKEN}), friendsController.index);
  
  router.post('/friends', jwt({secret: process.env.SECRET_TOKEN}), friendsController.add);
  router.post('/videos', jwt({secret: process.env.SECRET_TOKEN}), videosController.create);
  
  router.get('/videos', jwt({secret: process.env.SECRET_TOKEN}), videosController.index);
  router.post('/friends/search', jwt({secret: process.env.SECRET_TOKEN}), friendsController.search);
  
  router.post('/media', jwt({secret: process.env.SECRET_TOKEN}), mediaController.create);
  
  return router
}
