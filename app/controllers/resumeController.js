module.exports.getResume = function(req,res){
	var userId = req.user.id;

	sequelize.query("select * from resumes where userId = "+userId,{type: Sequelize.QueryTypes.SELECT }).then(function(data){
		res.status(200).json({
			resume: data
		})
	}).catch(function(error){
		res.status(400).json({
			error: error
		})
	});
}

module.exports.createResume = function(req,res){
	
	var attr = {
		name: req.body.name,
		title: req.body.title,
		summary: req.body.summary,
		industry: req.body.industry,
		userId: req.user.id
	};

	Model.Resume.findAll({
		where:{
			userId: req.user.id
		}
	}).then(function(data){
		if(data.length == 0){
			Model.Resume.create(attr).then(function(data){
				res.status(200).json({
					resume: data
				})
			}).catch(function(error){
				res.status(400).json({
					error: error,
					message: "error creating the resume"
				})
			})
		}else{
			res.status(400).json({
				message: "Your Resume Already Exists"
			})
		}
	})
}
"use strict";
var Model = require('../model/models.js'),
  Sequelize = require('sequelize'),
  _ = require('lodash');

var sequelize = require("../sequelize.js");

module.exports.editResume = function(req,res){
	
	var attrs = {
		name: req.body.name,
		title: req.body.title,
		summary: req.body.summary,
		industry: req.body.industry,
		userId: req.user.id
	}


	Model.Resume.findOne({
		where:{
			userId: req.user.id
		}
	}).then(function(resume){
		console.log(resume);
		resume.update(attrs).then(function(resume){
			return res.status(200).json({
				resume: resume
			})
		}).catch(function(error){
			return res.status(400).json({
				error: error,
				message: "unable to edit resume"
			})
		});
	}).catch(function(error){
		return res.status(400).json({
			error: error,
			message: "unable to find resume"
		})
	})
}
