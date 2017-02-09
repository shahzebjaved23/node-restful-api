"use strict";
var Model = require('../model/models.js'),
  Sequelize = require('sequelize'),
  _ = require('lodash');

var sequelize = require("../sequelize.js");

module.exports.addExperience = function(req,res){
	
	Model.Resume.findOne({
		where:{
			userId: req.user.id
		}
	}).then(function(resume){
		
		var attrs = {
			title: req.body.title,
			description: req.body.description,
			company: req.body.company,
			start_date: req.body.start_date,
			end_date: req.body.end_date,
			resume_id: resume.id,
			job_category_id: req.body.job_category_id
		};
		
		Model.Experience.create(attrs).then(function(experience){
			return res.status(200).json({
				experience: experience
			})
		}).catch(function(error){
			return res.status(400).json({
				error: error,
				message: "connot create experience"
			})
		})
	}).catch(function(error){
		return res.status(400).json({
			error: error,
			message: "cannot find resume"
		})
	})
}

module.exports.getExperience = function(req,res){
	Model.Experience.findById(req.params.experienceId).then(function(experience){
		return res.status(200).json({
			experience: experience
		})
	}).catch(function(error){
		return res.status(400).json({
			error: error
		})
	})
}

module.exports.getExperiences = function(req,res){
	Model.Resume.findOne({
		where:{
			userId: req.user.id
		}
	}).then(function(resume){
		Model.Experience.findAll({
			where:{
				resume_id: resume.id
			}
		}).then(function(experiences){
			return res.status(200).json({
				experiences: experiences
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

module.exports.removeExperience = function(req,res){
	
	Model.Experience.findById(req.params.experienceId).then(function(experience){
		experience.destroy().then(function(){
			res.status(200).json({
				message: "successfully destroyed"
			})
		}).catch(function(error){
			return res.status(400).json({
				error: error
			})
		});
	})
}

module.exports.editExperience = function(req,res){
	
	Model.Experience.findById(req.params.experienceId).then(function(experience){
		
		var attrs = {
			title: req.body.title,
			description: req.body.description,
			company: req.body.company,
			start_date: req.body.start_date,
			end_date: req.body.end_date,
			job_category_id: req.body.job_category_id
		};

		experience.update(attrs).then(function(experience){
			return res.status(200).json({
				experience: experience
			})
		}).catch(function(error){
			return res.status(400).json({
				error: error
			})
		})
	})
}

