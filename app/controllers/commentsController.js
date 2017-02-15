"use strict";
var Model = require('../model/models.js'),
  Sequelize = require('sequelize'),
  _ = require('lodash');

var sequelize = require("../sequelize.js");

module.exports.add = function(req,res){	 

	var typeId = null;
	var type = null;

	if(req.params.postId){
		typeId = req.params.postId;
		type = "Post";
	}else if(req.params.photoId){
		typeId = req.params.photoId;
		type = "Photo";
	} else if(req.params.videoId){
		typeId = req.params.videoId;
		type = "Video";
	}

	Model.Comment.create({
		userId: req.user.id,
		typeId: typeId,
		type: type,
		body: req.body.commentBody
	}).then(function(Comment){
		res.status(200).json({
		  message: "Comment Added successfully"
		})
	}).catch(function(error){
		return res.status(400).json({
		  error: error
		})
	})
}

module.exports.get = function(req,res){
  
  	var typeId = null;
	var type = null;

	if(req.params.postId){
		typeId = req.params.postId;
		type = "Post";
	}else if(req.params.photoId){
		typeId = req.params.photoId;
		type = "Photo";
	} else if(req.params.videoId){
		typeId = req.params.videoId;
		type = "Video";
	}

	var limit = 5;
	var offset = 0;

	console.log(req.query)

	if(req.query != null & req.query.limit != null){
		limit = req.query.limit
	}

	if(req.query != null &  req.query.offset != null){
		offset = req.query.offset
	}

	sequelize.query("select comments.* from comments where type = '"+type+"' and typeId ="+typeId+" limit "+limit+" offset "+offset,{ type: sequelize.QueryTypes.SELECT}).then(function(comments){

		var comments_ids = comments.map(function(comment){
			return comment.id;
		})

		Model.Comment.findAll({
			where:{
				id:{$in: comments_ids}
			},
			include: [Model.User]
		}).then(function(comments){
			return res.status(200).json({
			  comments: comments
			})	
		})
		
	})
	
	// Model.Comment.findAll({
	// 	where:{
	// 		typeId: typeId,
	// 		type: type
	// 	},
	// 	limit: limit,
	// 	offset: offset,
	// 	subQuery:false,
	// 	include: [Model.User]	 
	// }).then(function(comment){
	// 	res.status(200).json({
	// 	  comments: comment
	// 	})
	// }).catch(function(error){
	// 	return res.status(400).json({
	// 	  error: error
	// 	})
	// }) 
}