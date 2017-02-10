"use strict";
var Model = require("../model/models.js"),
  fs = require('fs'),
  mkdirp = require('mkdirp'),
  S3Upload = require('../modules/S3Upload.js');

module.exports.update = function(req, res) {
  
  let attrs = {};
  console.log(req.files.file);
  attrs["firstName"] = req.body.firstName;
  attrs["lastName"] = req.body.lastName;
  
  if(req.files.file){
    attrs["profile_image_name"] = req.files.file.originalFilename;
  }
  
  Model.User.update(attrs, {where: {id: req.user.id}}).then(function(results){
      
      if(attrs["profile_image_name"]){
        fs.readFile(req.files.file.path,function(error,data){
          var dirName = 'public/uploads/users/' + req.user.id + '/' + attrs["file"];
          S3Upload.upload(dirName, data, function(err, data){
            fs.unlink(req.files.file.path,function(){
              Model.User.findById(req.user.id).then((user) => {
                res.status(200).json({
                  user: user
                })
              });  
            })
          });  
        }) 
      }
    }).catch(function(error) {
      res.status(400).json({error: error});
    });
}
