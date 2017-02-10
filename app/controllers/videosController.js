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

   // var proc = new ffmpeg(req.files.file.path)
   //    .takeScreenshots({
   //        count: 1,
   //        timemarks: [ '200' ] // number of seconds
   //      }, './thumbnails/', function(err){
   //      console.log('screenshots were saved');
   //      fs.readFile('./thumbnails/tn.png',function(error,data){
   //        console.log(data);
   //      })

   //    }.bind(this));

  
  // generate the thumbnail and upload
  
  
  
  fs.readFile(req.files.file.path,function(error,data){
    console.log(data);
    Model.Video.create(attrs)
    .then((video) => {
      
      var dirName = `public/uploads/videos/${video.id}/${video.filePath}`;
      
      S3Upload.upload(dirName, data, function(error, data) {

        require('child_process').exec('ffmpeg -ss 00:00:25 -i ' + req.files.file.path + ' -vframes 1 -q:v 2 ' + './screenshot.png', function () {
            console.log('Saved the thumb to:', './screenshot.png');
            fs.readFile('./screenshot.png',function(error,data){
              console.log(data);
              
              var dirName = `public/uploads/videos/${video.id}/${video.thumbnailPath}`;
              
              S3Upload.upload(dirName, data, function(error, data) {
                  
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
