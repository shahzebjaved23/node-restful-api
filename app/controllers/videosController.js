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
                        feedType: "Video",
                        feedTypeId: video.id,
                        url: video.publicUrl
                      })
                      console.log('Temp File Delete');
                    });
                  });

              })
            })
        });

        // return the response
        return res.status(200).json({
          video: video
        });
      });
    }).catch( (error) => {
      res.status(400).json({
        error: error
      });
    });
  });

}
