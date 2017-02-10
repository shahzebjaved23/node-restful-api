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

   // var proc = new ffmpeg(req.files.file.path)
   //    .takeScreenshots({
   //        count: 1,
   //        timemarks: [ '200' ] // number of seconds
   //      }, './thumbnails/', function(err){
   //      console.log('screenshots were saved');

   //    });

  // require('child_process').exec(('ffmpeg -ss 00:00:25 -i ' + req.files.file.path + ' -vframes 1 -q:v 2 ' + './snapshots/'), function () {

  //     console.log('Saved the thumb to:', './snapshots/');

  // });

   // ISSUE: The callback dosent get called
  
  
  // fs.readFile(req.files.file.path,function(error,data){
  //   console.log(data);
  //   Model.Video.create(attrs)
  //   .then((video) => {
      
  //     var dirName = `public/uploads/videos/${video.id}/${video.filePath}`;
      
  //     S3Upload.upload(dirName, data, function(error, data) {

        
  //       // unlink the file in temp storage
  //       fs.unlink(req.files.file.path, function (err) {
  //         if (err) {
  //             console.error(err);
  //         }
  //         console.log('Temp File Delete');
  //       });

  //       // return the response
  //       return res.status(200).json({
  //         video: video
  //       });
  //     });
  //   }).catch( (error) => {
  //     res.status(400).json({
  //       error: error
  //     });
  //   });
  // });

}
