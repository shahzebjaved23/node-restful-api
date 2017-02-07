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

	sequelize.query("select * from jobs where id in (select jobId from jobs_applicants where userId="+userId+" order by createdAt DESC)",{type: Sequelize.QueryTypes.SELECT })
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
module.exports.getPostedJobs = function(req,res){
	var userId = req.user.id;

	sequelize.query("select * from jobs where userId="+userId+" order by createdAt DESC",{type: Sequelize.QueryTypes.SELECT }).then(function(data){
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
module.exports.getAllJobs = function(req,res){
	var userId = req.user.id;
	sequelize.query("select * from jobs order by createdAt DESC",{type: Sequelize.QueryTypes.SELECT})
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
// module.exports.getJobs = function(req,res){
// 	sequelize.query("select * from jobs where userId not in ("+req.user.id+")",{type: Sequelize.QueryTypes.SELECT })
// 	.then(function(data){
// 		return res.status(200).json({
// 			jobs: data
// 		})
// 	}).catch(function(){
// 		return res.status(400).json({
// 			error: error
// 		})
// 	})
// }

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


module.exports.createResume = function(req,res){
	var userId = req.user.id;
	var name = req.body.name;
	var title = req.body.title;
	var summary = req.body.summary;
	var industry = req.body.industry;

	var attr = {
		name: name,
		title: title,
		summary: summary,
		industry: industry,
		userId: userId
	};

	Model.Resume.findAll({
		where:{
			userId: userId
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

module.exports.editResume = function(){


}

module.exports.addExperience = function(){

}

module.exports.addProject = function(){

}

module.exports.addDegree = function(){

}

module.exports.removeExperience = function(){

}

module.exports.removeProject = function(){

}

module.exports.removeDegree = function(){

}

module.exports.editExperience = function(){

}

module.exports.editDegree = function(){

}

module.exports.editProject = function(){
	
}


    // Information Technology and Services
    // Computer Software
    // Marketing and Advertising
    // Education Management
    // Telecommunications
    // Consumer Services
    // Human Resources
    // Textiles
    // Accounting
    // Electrical/Electronic Manufacturing
    // Retail
    // Construction
    // Internet
    // Food & Beverages
    // Automotive
    // Insurance
    // Apparel & Fashion
    // Health, Wellness and Fitness
    // Hospital & Health Care
    // Pharmaceuticals
    // Import and Export
    // Non-Profit Organization Management
    // Financial Services
    // Writing and Editing
    // Design
    // Outsourcing/Offshoring
    // Hospitality
    // Real Estate
    // Information Services
    // Business Supplies and Equipment
    // Chemicals
    // Logistics and Supply Chain
    // Civil Engineering
    // Banking
    // Consumer Goods
    // Management Consulting
    // Airlines/Aviation
    // Online Media
    // Mechanical or Industrial Engineering
    // Food Production
    // Architecture & Planning
    // E-Learning
    // Graphic Design
    // Media Production
    // Transportation/Trucking/Railroad
    // Oil & Energy
    // Security and Investigations
    // Computer & Network Security
    // Events Services
    // Computer Games




