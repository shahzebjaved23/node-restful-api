"use strict";
var Model = require('../model/models.js'),
  S3Upload = require('../modules/S3Upload.js');
var formidable = require('formidable');
var path = require('path');
var fs = require('fs');

module.exports.index = function (req, res) {
  Model.User.findById(req.user.id).then((user) => {
    user.getPhotos().then( (photos) => {
      res.status(200).json({
        photos: photos
      });
    })
  })
}
module.exports.create = function(req, res) {

  let attrs = {};
  attrs["filePath"] = req.files.someFile.originalFilename;
  attrs["userId"] = req.user.id;
  

  fs.readFile(req.files.someFile.path,function(error,data){
    
    Model.Photo.create(attrs)
    .then((photo) => {
      var dirName = "public/uploads/photos/"+photo.id+"/"+photo.filePath;
      console.log(dirName);
      console.log("before the upload");
      S3Upload.upload(dirName, data, function(error, data) {
          // create a new feed
          console.log("creating the feed");
          Model.Feed.create({
            photoId: photo.id,
            userId: req.user.id
          });
          console.log("creating the response 200");
          // send the response
          return res.status(200).json({
            photo: photo
          });
      });

    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json({
        error: error,
        message: "error creating the photo"
      });
    });
  });

  
  
  
}

module.exports.likes = function(req,res){
  var userId = req.user.id;
  var photoId = req.params.photoId;
  
  Model.Like.findAll({
        where: {
          photoId: photoId
        }
      }).then(function(likes){
    return res.status(200).json({likes: likes});
  }).catch(function(error){
    return res.status(400).json({error: error})
  });
}

module.exports.addLike = function(req,res){
  var attrs = {};
  attrs["userId"] = req.user.id;
  attrs["photoId"] = req.params.photoId;
  
  Model.Like.create(attrs).then(function(like){
    return res.status(200).json({ message: "created successfully"});
  }).catch(function(error){
    return res.status(400).json({ error: error});
  });
}

module.exports.comments = function(req,res){
  var userId = req.user.id;
  var photoId = req.params.photoId;

  Model.Comment.findAll({
    where: {
      photoId: photoId
    }
  }).then(function(comments){
    res.status(200).json({
      comments: comments
    })
  }).catch(function(error){
    res.status(400).json({
      error: error
    })
  });
}

module.exports.addComment = function(req,res){
  var userId = req.user.id;
  var photoId = req.params.photoId;
  var body = req.body.commentBody;


  var attrs = {};
  attrs["body"] = body;
  attrs["userId"] = userId;
  attrs["photoId"] = photoId;

  Model.Comment.create(attrs).then(function(photo){
    res.status(200).json({
      photo: photo
    })
  }).catch( (error)=> {
    res.status(400).json({
      error: error
    })
  });
}
