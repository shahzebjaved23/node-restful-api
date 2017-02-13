"use strict";

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

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
  jobsController = require('../controllers/jobsController.js'),
  resumeController = require('../controllers/resumeController.js'),
  projectsController = require('../controllers/projectsController.js'),
  degreesController = require('../controllers/degreesController.js'),
  experiencesController = require('../controllers/experiencesController.js'),
  profilesController = require('../controllers/profilesController'),
  eventsController = require('../controllers/eventsController.js');

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
  
  router.get('/posts', jwt({secret: process.env.SECRET_TOKEN}), postsController.index );
  router.post('/posts/add', jwt({secret: process.env.SECRET_TOKEN}), postsController.add );
  router.get('/posts/:id',jwt({secret: process.env.SECRET_TOKEN}),postsController.show );
  
  router.put('/users/:id', jwt({secret: process.env.SECRET_TOKEN}), multipartMiddleware ,usersController.update);
  
  router.post('/photos',jwt({secret: process.env.SECRET_TOKEN}),multipartMiddleware ,photosController.create);
  router.get('/photos', jwt({secret: process.env.SECRET_TOKEN}), photosController.index);
  
  router.get('/friends', jwt({secret: process.env.SECRET_TOKEN}), friendsController.index);
  router.post('/friends', jwt({secret: process.env.SECRET_TOKEN}), friendsController.add);
  router.post('/friends/search', jwt({secret: process.env.SECRET_TOKEN}), friendsController.search);

  router.post('/videos', jwt({secret: process.env.SECRET_TOKEN}),multipartMiddleware ,videosController.create);
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

// Profile routes
  router.post("/profile",jwt({secret: process.env.SECRET_TOKEN}),profilesController.create);
  router.put("/profile",jwt({secret: process.env.SECRET_TOKEN}), profilesController.update);
  router.get("/profile",jwt({secret: process.env.SECRET_TOKEN}), profilesController.getProfile);

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
  router.post("/jobs/:jobId/apply",jwt({secret: process.env.SECRET_TOKEN}), jobsController.apply);
  router.get("/jobs/applicants",jwt({secret: process.env.SECRET_TOKEN}),jobsController.getJobApplicants)

  router.post("/resume", jwt({secret: process.env.SECRET_TOKEN}), resumeController.createResume);
  router.get("/resume", jwt({secret: process.env.SECRET_TOKEN}), resumeController.getResume);
  router.put("/resume/edit", jwt({secret: process.env.SECRET_TOKEN}), resumeController.editResume);

  router.post("/experiences/add", jwt({secret: process.env.SECRET_TOKEN}), experiencesController.addExperience);
  router.put("/experiences/:experienceId/edit",jwt({secret: process.env.SECRET_TOKEN}), experiencesController.editExperience);
  router.get("/experiences/:experienceId",jwt({secret: process.env.SECRET_TOKEN}), experiencesController.getExperience);
  router.get("/experiences",jwt({secret: process.env.SECRET_TOKEN}), experiencesController.getExperiences);
  router.post("/experiences/:experienceId/remove",jwt({secret: process.env.SECRET_TOKEN}), experiencesController.removeExperience);

  router.post("/projects/add", jwt({secret: process.env.SECRET_TOKEN}), projectsController.addProject);
  router.put("/projects/:projectId/edit",jwt({ secret: process.env.SECRET_TOKEN}), projectsController.editProject);
  router.post("/projects/:projectId/remove",jwt({ secret: process.env.SECRET_TOKEN}), projectsController.removeProject);
  router.get("/projects/:projectId",jwt({ secret: process.env.SECRET_TOKEN}), projectsController.getProject)
  router.get("/projects", jwt({ secret: process.env.SECRET_TOKEN}), projectsController.getProjects);

  router.post("/degrees/add", jwt({ secret: process.env.SECRET_TOKEN}), degreesController.addDegree);
  router.put("/degrees/:degreeId/edit", jwt({ secret: process.env.SECRET_TOKEN}), degreesController.editDegree);
  router.post("/degrees/:degreeId/remove", jwt({ secret: process.env.SECRET_TOKEN}), degreesController.removeDegree);
  router.get("/degrees/:degreeId", jwt({ secret: process.env.SECRET_TOKEN}), degreesController.getDegree);
  router.get("/degrees", jwt({ secret: process.env.SECRET_TOKEN}), degreesController.getDegrees);

  router.post("/send_connection_request", jwt({ secret: process.env.SECRET_TOKEN}), jobsController.sendConnectionRequest);
  router.post("/accept_connection_request", jwt({ secret: process.env.SECRET_TOKEN}), jobsController.acceptConnectionRequest);
  router.post("/cancel_connection_request", jwt({ secret: process.env.SECRET_TOKEN}), jobsController.cancelConnectionRequest);
  router.post("/remove_connection",jwt({secret: process.env.SECRET_TOKEN}), jobsController.removeConnection)


// events Routes
  router.post("/events",jwt({secret: process.env.SECRET_TOKEN}), eventsController.create);
  router.get("/events/feed",jwt({secret: process.env.SECRET_TOKEN}), eventsController.getEventsFeeds);
  router.post("/events/:eventId/going",jwt({secret: process.env.SECRET_TOKEN}), eventsController.markAsGoing);
  router.post("/events/:eventId/interested",jwt({secret: process.env.SECRET_TOKEN}), eventsController.markAsInterested);
  router.get("/events/interested",jwt({secret: process.env.SECRET_TOKEN}), eventsController.getInterestedEvents);
  router.get("/events/going",jwt({secret: process.env.SECRET_TOKEN}), eventsController.getGoingEvents);
  router.get("/events/posted",jwt({secret: process.env.SECRET_TOKEN}), eventsController.getUserEvents);



  return router
}
