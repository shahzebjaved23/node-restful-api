"use strict";
var Model = require('../model/models.js'),
  Sequelize = require('sequelize'),
  _ = require('lodash');

var sequelize = require("../sequelize.js");

module.exports.removeDegree = function(req,res){
	Model.Degree.findOne(req.params.degreeId).then(function(degree){
		degree.destroy().then(function(){
			return res.status(200).json({
				message: "degree removed successfully"
			})
		}).catch(function(error){
			return res.status(400).json({
				error: error
			})
		})
	}).catch(function(error){
		res.status(400).json({
			error: error
		})
	})
}

module.exports.addDegree = function(req,res){
	Model.Resume.findOne({
		where: {
			userId: req.user.id
		}
	}).then(function(resume){
		var attrs = {
			title: req.body.title,
			description: req.body.description,
			class: req.body.class,
			grade: req.body.grade,
			field: req.body.field,
			institution: req.body.institution,
			start_year: req.body.start_year,
			end_year: req.body.end_year
		};
		Model.Degree.create(attrs).then(function(degree){
			return res.status(200).json({
				degree: degree
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

module.exports.editDegree = function(req,res){
	Model.Degree.findOne(req.params.degreeId).then(function(degree){
		var attrs = {
			title: req.body.title,
			description: req.body.description,
			class: req.body.class,
			grade: req.body.grade,
			field: req.body.field,
			institution: req.body.institution,
			start_year: req.body.start_year,
			end_year: req.body.end_year
		};
 		
 		degree.update(attrs).then(function(degree){
 			return res.status(200).json({
 				degree: degree
 			})
 		}).catch(function(error){
 			res.status(400).json({
 				error: error
 			})
 		})
	}).catch(function(error){
		res.status(400).json({
			error: error
		})
	})
}

module.exports.getDegree = function(req,res){
	Model.Degree.findById(req.params.degreeId).then(function(degree){
		return res.status(200).json({
			degree: degree
		})
	}).catch(function(error){
		res.status(400).json({
			error: error
		})
	})
}

module.exports.getDegrees = function(req,res){
	Model.Resume.findOne({
		where:{
			userId: req.user.id
		}
	}).then(function(resume){
		Model.Degree.findAll({
			where: {
				resume_id: resume.id
			}
		}).then(function(degrees){
			return res.status(200).json({
				degrees: degrees
			})	
		}).catch(function(){
			return res.status(400).json({
				error: error
			})
		})
	}).catch(function(){
		return res.status(400).json({
			error: error
		})
	})
	
}

