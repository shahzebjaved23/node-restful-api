"use strict";
var Model = require("../model/models.js");

module.exports.index = function(req, res) {
  console.log(process.env);
  Model.User.findById(req.user.id).then((user) =>{
    user.getPosts({include: {model: Model.User, attributes: { exclude: ['password','salt']} }}).then( (posts) => {
      res.status(200).json({
        posts: posts
      });
    })
  });
}

module.exports.add = function(req, res) {
  var postAttributes = {};
  var userId = req.user.id;
  postAttributes["body"] = req.body.body;
  postAttributes["userId"] = req.user.id;
  postAttributes["include"] = [Model.User];
  
  Model.User.findById(req.user.id).then((user) => {
    Model.Post.create(postAttributes).then(function(post){

      // create the feed
      Model.Feed.create({
        userId: req.user.id,
        status: "created",
        feedType: "Post",
        feedTypeId: post.id,
        url: "/posts/"+post.id
      }).then(function(){
        // send the response
        return res.status(200).json({
          post: post,
          user: user
        });  
      })

      
    }).catch(function(error){
        return res.status(400).json({
          error: error
        });
      });

  })
}

module.exports.show = function(req,res){
  Model.Post.findOne({
    where:{
      id: req.params.id
    }
  }).then(function(post){
    return res.status(200).json({
      post: post
    })
  }).catch(function(error){
    return res.status(400).json({
      error: error
    })
  })
}



