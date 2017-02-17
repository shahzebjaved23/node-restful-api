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
  eventsController = require('../controllers/eventsController.js'),
  albumsController = require('../controllers/albumsController.js'),
  likesController = require('../controllers/likesController.js'),
  commentsController = require('../controllers/commentsController.js');

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
  router.get('/photos/:photoId/likes',jwt({secret: process.env.SECRET_TOKEN}),likesController.get)
  router.post('/photos/:photoId/likes',jwt({secret: process.env.SECRET_TOKEN}),likesController.add)
  
// Posts Likes
  router.get('/posts/:postId/likes',jwt({secret: process.env.SECRET_TOKEN}),likesController.get)
  router.post('/posts/:postId/likes',jwt({secret: process.env.SECRET_TOKEN}),likesController.add)

// Posts Videos
  router.get('/videos/:videoId/likes',jwt({secret: process.env.SECRET_TOKEN}),likesController.get)
  router.post('/videos/:videoId/likes',jwt({secret: process.env.SECRET_TOKEN}),likesController.add)  

// Photos Comments
  router.get('/photos/:photoId/comments',jwt({secret: process.env.SECRET_TOKEN}),commentsController.get)
  router.post('/photos/:photoId/comments',jwt({secret: process.env.SECRET_TOKEN}),commentsController.add)
  
// Posts comments
  router.get('/posts/:postId/comments',jwt({secret: process.env.SECRET_TOKEN}),commentsController.get)
  router.post('/posts/:postId/comments',jwt({secret: process.env.SECRET_TOKEN}),commentsController.add)

// Videos comments
  router.get('/videos/:videoId/comments',jwt({secret: process.env.SECRET_TOKEN}),commentsController.get)
  router.post('/videos/:videoId/comments',jwt({secret: process.env.SECRET_TOKEN}),commentsController.add)


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
  router.get("/jobs/:jobId/applicants",jwt({secret: process.env.SECRET_TOKEN}),jobsController.getJobApplicants)

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

// seperate feeds for videos and photos
  router.get("/media/feed",jwt({secret: process.env.SECRET_TOKEN}),mediaController.getMediaFeeds)

// events Routes
  router.post("/events",jwt({secret: process.env.SECRET_TOKEN}), eventsController.create);
  router.get("/events/feed",jwt({secret: process.env.SECRET_TOKEN}), eventsController.getEventsFeeds);
  router.get("/events/friends/feed",jwt({secret: process.env.SECRET_TOKEN}),eventsController.getFriendsEventsFeeds);
  router.post("/events/going",jwt({secret: process.env.SECRET_TOKEN}), eventsController.markAsGoing);
  router.post("/events/interested",jwt({secret: process.env.SECRET_TOKEN}), eventsController.markAsInterested);
  router.get("/events/interested",jwt({secret: process.env.SECRET_TOKEN}), eventsController.getInterestedEvents);
  router.get("/events/going",jwt({secret: process.env.SECRET_TOKEN}), eventsController.getGoingEvents);
  router.get("/events/posted",jwt({secret: process.env.SECRET_TOKEN}), eventsController.getUserEvents);

// albums routes
  router.post("/albums",jwt({secret: process.env.SECRET_TOKEN}), albumsController.create);
  router.post("/albums/:albumId/delete",jwt({secret: process.env.SECRET_TOKEN}), albumsController.removeAlbum);
  router.post("/albums/:albumId/addPhoto/:photoId",jwt({secret: process.env.SECRET_TOKEN}), albumsController.addPhoto);
  router.post("/albums/:albumId/removePhoto/:photoId",jwt({secret: process.env.SECRET_TOKEN}), albumsController.removePhoto);
  router.get("/albums/:albumId",jwt({secret: process.env.SECRET_TOKEN}), albumsController.getAlbum);
  router.get("/albums",jwt({secret: process.env.SECRET_TOKEN}), albumsController.getAllAlbums);

  return router
}

// SHAFUL_ACCESS_KEY_ID="AKIAJRZJIJZ3LEUKM52A"
// SHAFUL_SECRET_ACCESS_KEY="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"
// SHAFUL_S3_BUCKET="tl-images"

