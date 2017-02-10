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
  var userId = req.user.id;
  postAttributes["body"] = req.body.body;
  postAttributes["userId"] = req.user.id;
  postAttributes["include"] = [Model.User];
  
  Model.User.findById(req.user.id).then((user) => {
    Model.Post.create(postAttributes).then(function(post){

      // create the feed
      Model.Feed.create({
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

module.exports.likes = function(req,res){
  var userId = req.user.id;
  var postId = req.params.postId;
  
  Model.Like.findAll({
        where: {
          postId: postId
        }
      }).then(function(likes){
    return res.status(200).json({likes: likes});
  }).catch(function(error){
    return res.status(400).json({error: error})
  });
}

module.exports.addLike = function(req,res){
  var attrs = {};
  attrs["userId"] = req.user.id;
  attrs["postId"] = req.params.postId;
  
  Model.Like.create(attrs).then(function(like){
    return res.status(200).json({ message: "created successfully"});
  }).catch(function(error){
    return res.status(400).json({ error: error});
  });
}

module.exports.comments = function(req,res){
  var userId = req.user.id;
  var postId = req.params.postId;

  Model.Comment.findAll({
    where: {
      postId: postId
    }
  }).then(function(comments){
    res.status(200).json({
      comments: comments
    })
  }).catch(function(error){
    res.status(400).json({
      error: error
    })
  });
}

module.exports.addComment = function(req,res){
  var userId = req.user.id;
  var postId = req.params.postId;
  var body = req.params.commentBody;

  var attrs = {};
  attrs["body"] = body;
  attrs["userId"] = userId;
  attrs["postId"] = postId;


  Model.Comment.create(attrs).then(function(photo){
    res.status(200).json({
      photo: photo
    })
  }).catch( (error)=> {
    res.status(400).json({
      error: error
    })
  });
}

