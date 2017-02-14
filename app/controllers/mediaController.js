"use strict";
var Model = require('../model/models.js'),
  S3Upload = require('../modules/S3Upload.js'),
  _ = require('lodash');

var sequelize = require("../sequelize.js");

module.exports.create = function(req, res) { 
  let fileName = req.body.fileName,
    fileDATA = req.body.fileData,
    randomID = _.random(1, 55555);
  let dirName = `public/uploads/media/${randomID}/${fileName}`;
  let fileUrl = `https://${process.env.SHAFUL_S3_BUCKET}.s3.amazonaws.com/${dirName}`;

  S3Upload.upload(dirName, fileDATA, function(error, data) {
    res.status(200).json({
      fileUrl: fileUrl
    });
  });
}


module.exports.getMediaFeeds = function(req,res){

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
        sequelize.query("SELECT * from feeds where userId in ("+friends_ids+") ORDER BY createdAt DESC",{ type: sequelize.QueryTypes.SELECT }).then( (feeds)=>{
            return res.status(200).json({
              feeds:feeds
            });
          } ).catch((error)=>{
            return res.status(400).json({
              error: error
            });
          }); 
      }else{
        return res.status(200).json({
          message: "you have no feeds"
        })
      }
      
    });
  
}
