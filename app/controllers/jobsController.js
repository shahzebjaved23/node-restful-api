"use strict";
var Model = require('../model/models.js'),
  Sequelize = require('sequelize'),
  _ = require('lodash');

var sequelize = require("../sequelize.js");

/*
gets all the jobs the user has applied for
*/

module.exports.getAppliedJobs = function(req,res){
	var userId = req.user.id;

	sequelize.query("select * from jobs where id in (select jobId from job_applicants where userId="+userId+")",{type: Sequelize.QueryTypes.SELECT })
	.then(function(data){
		return res.status(200).json({
			jobs: data
		})
	}).catch(function(error){
		return res.status(400).json({
			error: error
		})
	})
}

// get all jobs posted by the user
module.exports.getUserJobs = function(){
	var userId = req.user.id;

	sequelize.query("select * from jobs where userId="+userId,{type: Sequelize.QueryTypes.SELECT }).then(function(data){
		return res.status(200).json({
			jobs: data
		})
	}).catch(function(error){
		return res.status(400).json({
			error: error
		})
	});
}

// get all the jobs, chronological order
module.exports.getAllJobs = function(){
	var userId = req.user.id;
	sequelize.query("select * from jobs",{type: Sequelize.QueryTypes.SELECT})
	.then(function(data){
		return res.status(200).json({
			jobs: data
		})
	})
	.catch(function(error){
		return res.status(400).json({
			error: error
		})
	});
}

// get all the jobs, that are not posted by the user
module.exports.getJobs = function(req,res){
	sequelize.query("select * from jobs where userId not in ("+req.user.id+")",{type: Sequelize.QueryTypes.SELECT })
	.then(function(data){
		return res.status(200).json({
			jobs: data
		})
	}).catch(function(){
		return res.status(400).json({
			error: error
		})
	})
}

module.exports.create = function(req,res){
	var userId = req.user.id;
	var title = req.body.title;
	var summary = req.body.summary;
	var company_name = req.body.company_name;
	var job_category_id = req.body.job_category_id;

	Model.Job.create({
		userId: userId,
		title: title,
		summary: summary,
		company_name: company_name,
		job_category_id: job_category_id
	}).then(function(data){
		return res.status(200).json({
			job: job
		})
	}).catch(function(error){
		return res.status(400).json({
			error: error
		})
	})

}

module.exports.apply = function(req,res){
	var userId = req.user.id;
	var jobId = req.body.jobId;

	Model.JobApplicant.create({
		userId: userId,
		jobId: jobId
	}).then(function(data){
		res.status(200).json({
			message: "Applied for the job"
		})
	}).catch(function(error){
		res.status(400).json({
			error: error
		})
	})
}
