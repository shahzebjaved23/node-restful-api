"use strict";
var Model = require('../model/models.js'),
  S3Upload = require('../modules/S3Upload.js');
var path = require('path');
var fs = require('fs');

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
  
  fs.readFile(req.files.file.path,function(error,data){

    Model.Video.create(attrs)
    .then((video) => {
      var dirName = `public/uploads/videos/${video.id}/${video.filePath}`;
      S3Upload.upload(dirName, data, function(error, data) {
        
        // unlink the file in temp storage
        fs.unlink(req.files.file.path, function (err) {
          if (err) {
              console.error(err);
          }
          console.log('Temp File Delete');
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
