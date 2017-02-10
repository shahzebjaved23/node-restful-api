"use strict";
var Model = require('../model/models.js'),
  Sequelize = require('sequelize'),
  _ = require('lodash');

var sequelize = require("../sequelize.js");

module.exports.create = function(req,res){
	var attrs = {
		mobile: req.body.mobile,
		skill_level: req.body.skill_level,
		bio: req.body.bio,
		userId: req.user.id
	}

	Model.Profile.create(attrs).then(function(profile){
		return res.status(200).json({
			profile: profile
		})
	}).catch(function(error){
		return res.status(400).json({
			error: error
		})
	})
}

module.exports.update = function(req,res){

	var attrs = {
		mobile: req.body.mobile,
		skill_level: req.body.skill_level,
		bio: req.body.bio,
		userId: req.user.id
	}

	Model.Profile.findOne({
		where:{
			userId: req.user.id
		}
	}).then(function(profile){
		profile.update(attrs).then(function(profile){
			return res.status(200).json({
				profile: profile
			})	
		}).catch(function(error){
			return res.status(400).json({
				error: error
			})
		})
	}).catch(function(error){
		return res.status(400).json({
			error: error
		})
	})
}

module.exports.getProfile = function(req,res){
	// Model.Profile.findOne({
	// 	where: {
	// 		userId: req.user.id
	// 	}
	// },{include: [Model.User]}).then(function(profile){
	// 	return res.status(200).json({
	// 		profile: profile
	// 	})
	// }).catch(function(error){
	// 	return res.status(400).json({
	// 		error: error
	// 	})
	// })
	Model.User.findById(req.user.id).then(function(user){
		user.getProfile({include: [Model.User]}).then(function(profile){
			return res.status(200).json({
				profile: profile
			})
		}).catch(function(error){
			return res.status(200).json({
				error: error
			})
		})
	})
}

