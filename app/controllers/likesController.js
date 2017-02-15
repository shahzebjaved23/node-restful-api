"use strict";
var Model = require('../model/models.js'),
  Sequelize = require('sequelize'),
  _ = require('lodash');

var sequelize = require("../sequelize.js");

module.exports.add = function(req,res){	 

	var typeId = null;
	var type = null;

	console.log(req.params)

	if(req.body.postId != null){
		typeId = req.params.postId;
		type = "Post";
	}else if(req.params.photoId != null){
		typeId = req.params.photoId;
		type = "Photo";
	} else if(req.params.videoId != null){
		typeId = req.params.videoId;
		type = "Video";
	}

	console.log(typeId)

	Model.Like.findAll({
		where:{
			userId: req.user.id,
			type: type,
			typeId: typeId
		}
	}).then(function(likesOfUser){
		console.log(likesOfUser);
		if(likesOfUser.length > 0){
			return res.status(400).json({
				message: "you have already liked this "+type
			})
		}else{
			Model.Like.create({
			    userId: req.user.id,
			    typeId: typeId,
			    type: type,
			}).then(function(like){
			    return res.status(200).json({
			      message: "like Added successfully"
			    })
			}).catch(function(error){
			    return res.status(400).json({
			      error: error
			    })
			})
		}
	}).catch(function(error){
		return res.status(400).json({
			error: error
		})
	})
}

module.exports.get = function(req,res){
  
  	var typeId = null;
	var type = null;

	if(req.body.postId){
		typeId = req.body.postId;
		type = "Post";
	}else if(req.body.photoId){
		typeId = req.body.photoId;
		type = "Photo";
	} else if(req.body.videoId){
		typeId = req.body.videoId;
		type = "Video";
	}

	Model.Like.count({
		typeId: typeId,
		type: type,
	}).then(function(like){
		res.status(200).json({
		  likes: like
		})
	}).catch(function(error){
		return res.status(400).json({
		  error: error
		})
	}) 
}