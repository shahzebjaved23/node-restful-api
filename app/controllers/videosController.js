"use strict";
var Model = require('../model/models.js'),
  S3Upload = require('../modules/S3Upload.js');
var path = require('path');
var fs = require('fs');
// var ffmpeg = require("fluent-ffmpeg");

module.exports.index = function (req, res) {
  Model.User.findById(req.user.id).then( (user) => {
    user.getVideos().then( (videos) => {
      res.status(200).json({
        videos: videos
      })
    });
  })
}

module.exports.create = function(req, res) {
  
  let attrs = {};
  attrs["userId"] = req.user.id;
  attrs["filePath"] = req.files.file.originalFilename;
  attrs["thumbnailPath"] = "screenshot.png"


  // read file and generate the buffer data
  fs.readFile(req.files.file.path,function(error,data){
    
    console.log(data);
    
    // create the video data in database
    Model.Video.create(attrs).then((video) => {
      
      var dirName = `public/uploads/videos/${video.id}/${video.filePath}`;
      
      // upload the video to s3
      S3Upload.uploadVideo(dirName, data, function(error, data) {

        // create the screenshot 
        require('child_process').exec('ffmpeg -ss 00:00:2 -i ' + req.files.file.path + ' -vframes 1 -q:v 2 ' + './screenshot.png', function () {
            // console.log(error);
            
            console.log('Saved the thumb to:', './screenshot.png');
            
            // read the screen shot and generate the buffer data
            fs.readFile('./screenshot.png',function(error,data){
              console.log(data);
              
              var dirName = `public/uploads/videos/${video.id}/${video.thumbnailPath}`;
              
              // upload the thumbnail to s3
              S3Upload.upload(dirName, data, function(error, data) {
                  
                  // unlink the screenshot
                  fs.unlink("./screenshot.png", function (err) {
                    if (err) {
                      console.error(err);
                    }
                    
                    console.log('Temp screenshot File Delete');
                    // unlink the file in temp storage
                    fs.unlink(req.files.file.path, function (err) {
                      if (err) {
                          console.error(err);
                      }
                      Model.Feed.create({
                        userId: req.user.id,
                        feedType: "Video",
                        feedTypeId: video.id,
                        url: video.publicUrl,
                        thumbnailUrl: video.thumbnailUrl
                      }).then(function(){
                         // return the response
                        return res.status(200).json({
                          video: video
                        });
                      }).catch( (error) => {
                        res.status(400).json({
                          error: error
                        });
                      });
                      console.log('Temp File Delete');
                    });
                  });
              })
            })
        });
      });
    }).catch( (error) => {
      res.status(400).json({
        error: error
      });
    });
  });

}


module.exports.getVideoFeed = function(req,res){
  var userId = req.user.id;

  // select the user ids that are friends of the above user id
  sequelize.query("SELECT users.id FROM `users` WHERE users.id IN (SELECT friendId FROM users_friends WHERE userId = "+userId+") OR users.id IN (SELECT userId FROM users_friends WHERE friendid = "+userId+") OR users.id = "+userId,{ type: sequelize.QueryTypes.SELECT}).then((friends)=>{

      // map them in an array friends_ids
      var friends_ids = [];
      friends.map(function(friend){
        friends_ids.push(friend.id);
      })
    

      if (friends_ids.length > 0){
        // get the videos of the friends_ids
        sequelize.query("SELECT * from videos where userId in ("+friends_ids+") ORDER BY createdAt DESC",{ type: sequelize.QueryTypes.SELECT }).then( (video)=>{
            return res.status(200).json({
              video:video
            });
          } ).catch((error)=>{
            return res.status(400).json({
              error: error
            });
          }); 
      }else{
        return res.status(200).json({
          message: "you have no videos"
        })
      }    
  });
}


