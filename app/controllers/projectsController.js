"use strict";
var Model = require('../model/models.js'),
  Sequelize = require('sequelize'),
  _ = require('lodash');

var sequelize = require("../sequelize.js");

module.exports.addProject = function(req,res){
	Model.Resume.findOne({
		where:{
			userId: req.user.id
		}
	}).then(function(resume){
		var attr = {
			name: req.body.name,
			description: req.body.description,
			url: req.body.url,
			start_date: req.body.start_date,
			end_date: req.body.end_date,
			resume_id: resume.id
		};

		Model.Project.create(attr).then(function(project){
			return res.status(200).json({
				project: project
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

module.exports.editProject = function(req,res){
	Model.Project.findById(req.params.projectId).then(function(project){
		var attr = {
			name: req.body.name,
			description: req.body.description,
			url: req.body.url,
			start_date: req.body.start_date,
			end_date: req.body.end_date
		};

		project.update(attr).then(function(project){
			return res.status(200).json({
				project: project
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

module.exports.removeProject = function(req,res){
	Model.Project.findById(req.params.projectId).then(function(project){
		project.destroy().then(function(){
			return res.status(200).json({
				message: "record destroyed successfully"
			})
		}).catch(function(error){
			return res.status.json({
				error: error
			})
		})
	}).catch(function(error){
		return res.status.json({
			error: error
		})
	})

}

module.exports.getProjects = function(req,res){
	Model.Resume.findOne({
		where: {
			userId: req.user.id
		}
	}).then(function(resume){
		Model.Project.findAll({
			where:{
				resume_id: resume.id
			}
		}).then(function(projects){
			return res.status(200).json({
				projects: projects
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

module.exports.getProject = function(req,res){
	Model.Project.findById(req.params.projectId).then(function(project){
		return res.status(200).json({
			project: project
		})
	}).catch(function(error){
		return res.status(400).json({
			error: error
		})
	})
}
