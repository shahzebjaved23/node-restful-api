"use strict";
var Model = require("../model/models.js"),
  fs = require('fs'),
  mkdirp = require('mkdirp'),
  S3Upload = require('../modules/S3Upload.js');

module.exports.update = function(req, res) {
  
  let attrs = {};
  
  attrs["firstName"] = req.body.firstName;
  attrs["lastName"] = req.body.lastName;
  
  if(req.body.profile_image_name){
    attrs["profile_image_name"] = req.body.profile_image_name;
  }
  
  Model.User.update(attrs, {where: {id: req.user.id}}).then(function(results){
      
      if(attrs["profile_image_name"]){
        var data = req.body.profile_image;
        var dirName = 'public/uploads/users/' + req.user.id + '/' + attrs["profile_image_name"];
        S3Upload.upload(dirName, data, function(err, data) { });
      }
      
      Model.User.findById(req.user.id).then((user) => {
        res.status(200).json({
          user: user
        })
      });

    })
    .catch(function(error) {
      res.status(400).json({error: error});
    });
}
