"use strict";
var Model = require('../model/models.js'),
  S3Upload = require('../modules/S3Upload.js');
var formidable = require('formidable');
var path = require('path');
var fs = require('fs');
var sequelize = require("../sequelize.js");

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

  var userId = req.user.id;

  let attrs = {};
  attrs["filePath"] = req.files.file.originalFilename;
  attrs["userId"] = userId;

  
  fs.readFile(req.files.file.path,function(error,data){
    
    Model.Photo.create(attrs).then(function(photo){

      console.log(photo.get({ plain: true}).publicUrl);


      var dirName = "public/uploads/photos/"+photo.id+"/"+photo.filePath;
      console.log("before the upload");
      
      S3Upload.upload(dirName, data, function(error, data) {
          
          // remove the file from local file system
          console.log("unlinking from local file system");
          fs.unlink(req.files.file.path, function (err) {
              if (err) {
                  console.error(err);
              }
              console.log('Temp File Delete');
          });

          // create a new feed
          console.log(photo);
          Model.Feed.create({
            userId: req.user.id,
            feedType: "Photo",
            feedTypeId: photo.id,
            url: photo.get({ plain: true}).publicUrl
          }).then(function(feed){

            console.log(feed);
            // send the response
            return res.status(200).json({
              photo: photo
            });  
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

module.exports.getFeeds = function(req,res){
    // get the user id
  var userId = req.user.id;

  // select the user ids that are friends of the above user id
  sequelize.query("SELECT users.id FROM `users` WHERE users.id IN (SELECT friendId FROM users_friends WHERE userId = "+userId+") OR users.id IN (SELECT userId FROM users_friends WHERE friendid = "+userId+") OR users.id = "+userId,{ type: sequelize.QueryTypes.SELECT}).then((friends)=>{

      // map them in an array friends_ids
      var friends_ids = [];
      friends.map(function(friend){
        friends_ids.push(friend.id);
      })
    

      if (friends_ids.length > 0){
        // get the posts and photos of the friends_ids
        sequelize.query("SELECT * from photos where userId in ("+friends_ids+") ORDER BY createdAt DESC",{ type: sequelize.QueryTypes.SELECT }).then( (photos)=>{
            return res.status(200).json({
              photos:photos
            });
          } ).catch((error)=>{
            return res.status(400).json({
              error: error
            });
          }); 
      }else{
        return res.status(200).json({
          message: "you have no photos"
        })
      }    
  });
}
