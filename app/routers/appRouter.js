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
  mediaController = require('../controllers/mediaController.js'),
  feedsController = require('../controllers/feedsController.js'),
  jobsController = require('../controllers/jobsController.js');

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
  
  router.post('/photos', jwt({secret: process.env.SECRET_TOKEN}) ,photosController.create);
  router.get('/photos', jwt({secret: process.env.SECRET_TOKEN}), photosController.index);
  
  router.get('/friends', jwt({secret: process.env.SECRET_TOKEN}), friendsController.index);
  router.post('/friends', jwt({secret: process.env.SECRET_TOKEN}), friendsController.add);
  router.post('/friends/search', jwt({secret: process.env.SECRET_TOKEN}), friendsController.search);

  router.post('/videos', jwt({secret: process.env.SECRET_TOKEN}), videosController.create);
  router.get('/videos', jwt({secret: process.env.SECRET_TOKEN}), videosController.index);
  
  router.post('/media', jwt({secret: process.env.SECRET_TOKEN}), mediaController.create);


// Photos likes
  router.get('/photos/:photoId/likes',jwt({secret: process.env.SECRET_TOKEN}),photosController.likes)
  router.post('/photos/:photoId/likes',jwt({secret: process.env.SECRET_TOKEN}),photosController.addLike)
  
// Posts Likes
  router.get('/posts/:postId/likes',jwt({secret: process.env.SECRET_TOKEN}),postsController.likes)
  router.post('/posts/:postId/likes',jwt({secret: process.env.SECRET_TOKEN}),postsController.addLike)

// Photos Comments
  router.get('/photos/:photoId/comments',jwt({secret: process.env.SECRET_TOKEN}),photosController.comments)
  router.post('/photos/:photoId/comments',jwt({secret: process.env.SECRET_TOKEN}),photosController.addComment)
  
// Posts comments
  router.get('/posts/:postId/comments',jwt({secret: process.env.SECRET_TOKEN}),postsController.comments)
  router.post('/posts/:postId/comments',jwt({secret: process.env.SECRET_TOKEN}),postsController.addComment)


// user feeds
  router.get("/feeds",jwt({secret: process.env.SECRET_TOKEN}),feedsController.feeds);

// Friend Requests

  router.get("/friend_requests",jwt({secret: process.env.SECRET_TOKEN}),friendsController.getFriendRequests);
  router.post("/send_friend_request",jwt({secret: process.env.SECRET_TOKEN}),friendsController.sendFriendRequest);
  router.post("/accept_friend_request",jwt({secret: process.env.SECRET_TOKEN}),friendsController.acceptFriendRequest); 
  router.post("/cancel_friend_request",jwt({secret: process.env.SECRET_TOKEN}), friendsController.cancelFriendRequest);
  router.post("/remove_friend",jwt({secret: process.env.SECRET_TOKEN}), friendsController.removeFriend);


// Jobs Routes
  router.get("/jobs/posted",jwt({secret: process.env.SECRET_TOKEN}), jobsController.getPostedJobs);
  router.get("/jobs/applied",jwt({secret: process.env.SECRET_TOKEN}), jobsController.getAppliedJobs);
  router.get("/jobs",jwt({secret: process.env.SECRET_TOKEN}), jobsController.getAllJobs);
  router.post("/jobs/post",jwt({secret: process.env.SECRET_TOKEN}), jobsController.create);

  router.post("/resume",jwt({secret: process.env.SECRET_TOKEN}), jobsController.createResume);


  return router
}
