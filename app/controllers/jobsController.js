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

	sequelize.query("select * from jobs where id in (select jobId from jobs_applicants where userId="+userId+" order by createdAt DESC) and status='visible'",{type: Sequelize.QueryTypes.SELECT })
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

	sequelize.query("select * from jobs where userId="+userId+" and status='visible' order by createdAt DESC",{type: Sequelize.QueryTypes.SELECT }).then(function(data){
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
	sequelize.query("select * from jobs where userId = "+userId+" and status='visible' order by createdAt DESC",{type: Sequelize.QueryTypes.SELECT})
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

// create the job
module.exports.create = function(req,res){
	var userId = req.user.id;
	var title = req.body.title;
	var summary = req.body.summary;
	var company_name = req.body.company_name;
	// var job_category_id = req.body.job_category_id;
	var status = req.body.status;

	Model.Job.create({
		userId: userId,
		title: title,
		summary: summary,
		company_name: company_name,
		status: status
		// job_category_id: job_category_id
	}).then(function(job){
		return res.status(200).json({
			job: job
		})
	}).catch(function(error){
		return res.status(400).json({
			error: error
		})
	})

}

// apply for a job
module.exports.apply = function(req,res){
	var userId = req.user.id;
	var jobId = req.params.jobId;

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

module.exports.getJobApplicants = function(req,res){
	sequelize.query("select users.id from users where id in (select userId from jobs_applicants where jobId in ( select id from jobs where userId= "+req.user.id+"))",{type: Sequelize.QueryTypes.SELECT }).then(function(data){

		var users_ids = data.map(function(user){
			return user.id
		})

		Model.User.findAll({
			where:{
				id:{
					$in:users_ids
				}
			},
			attributes: {exclude: ["password","salt","username"]}
		}).then(function(users){
			return res.status(200).json({
				applicants: users
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


module.exports.sendConnectionRequest = function(req,res){
	Model.Connection.create({
		userId: req.user.id,
		connectionId: req.params.connectionId,
		status: "pending"
	}).then(function(connection){
		return res.status(200).json({
			message: "connection request sent successfully"
		})
	}).catch(function(error){
		return res.status(400).json({
			error: error
		})
	})
}

module.exports.acceptConnectionRequest = function(req,res){
	Model.Connection.findById(req.params.connectionId).then(function(connection){
		connection.update({
			status: "done"
		}).then(function(){
			return res.status(200).json({
				message: "connection request successfully accepted"
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

module.exports.cancelConnectionRequest = function(req,res){
	Model.Connection.findById(req.params.id).then(function(connection){
		connection.destroy().then(function(){
			return res.status(200).json({
				message: "connection request cancelled"
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

module.exports.removeConnection = function(req,res){
	sequelize.query("select connection.id from connection where (userId= "+req.user.id+" and connectionId="+req.params.connectionId+") or (userId="+req.params.connectionId+" and connectionId="+req.user.id+")",{type: sequelize.QueryTypes.SELECT})
	.then(function(result){
		console.log(result[0].id);
	})
}




// job industries

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




