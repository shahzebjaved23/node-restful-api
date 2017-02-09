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
	var job_category_id = req.body.job_category_id;
	var status = req.body.status;

	Model.Job.create({
		userId: userId,
		title: title,
		summary: summary,
		company_name: company_name,
		status: status,
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
	sequelize.query("select * from users where id in (select userId from jobs_applicants where jobId in ( select id from jobs where userId= "+req.user.id+"))",{type: Sequelize.QueryTypes.SELECT }).then(function(data){
		return res.status(200).json({
			applicants: data
		})
	}).catch(function(error){
		return res.status(400).json({
			error: error
		})
	})
}

/*
-- Resume methods
*/

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


/*
-- Experience methods
*/
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
	
	Model.Experience.findOne(req.params.experienceId).then(function(experience){
		
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


/*
-- Degree methods
*/

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

/*
-- Project Methods
*/

module.exports.addProject = function(req,res){

}

module.exports.editProject = function(req,res){
	
}

module.exports.removeProject = function(req,res){

}

module.exports.getProjects = function(req,res){

}

module.exports.getProject = function(req,res){

}

/*
-- Connections Methods
*/

module.exports.sendConnectionRequest = function(req,res){

}

module.exports.acceptConnectionRequest = function(req,res){

}

module.exports.cancelConnectionRequest = function(req,res){

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




