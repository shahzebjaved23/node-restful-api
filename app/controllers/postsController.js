"use strict";
var Model = require("../model/models.js");

module.exports.index = function(req, res) {
  console.log(process.env);
  Model.User.findById(req.user.id).then((user) =>{
    user.getPosts({include: [Model.User]}).then( (posts) => {
      res.status(200).json({
        posts: posts
      });
    })
  });
}

module.exports.add = function(req, res) {
  var postAttributes = {};
  postAttributes["body"] = req.body.body;
  postAttributes["userId"] = req.user.id;
  postAttributes["include"] = [Model.User];
  Model.User.findById(req.user.id).then((user) => {
    Model.Post.create(postAttributes).then(function(post){
      return res.status(200).json({
        post: post,
        user: user
      });
    })
      .catch(function(error){
        return res.status(400).json({
          error: error
        });
      });

  })
}
