"use strict";
var Model = require('../model/models.js'),
  Sequelize = require('sequelize'),
  _ = require('lodash');

var sequelize = require("../sequelize.js");

module.exports.create = function(req,res){
	var userId = req.user.id;
	
	Model.Event.create({
		title: req.body.title,
		description: req.body.description,
		location: req.body.location,
		userId: userId
	}).then((event)=>{
		
		Model.Feed.create({
			userId: req.user.id,
			feedType: "Event",
			feedTypeId: event.id,
			status: "created"
		});

		return res.status(200).json({
			event: event
		})
	}).catch((error)=>{
		return res.status(400).json({
			error: error
		})
	})
}

// events posted by the user
module.exports.getUserEvents = function(req,res){
	Model.Event.findAll({
		where: {
			userId: req.user.id
		}
	}).then(function(events){

		return res.status(200).json({
			events: events
		})
	}).catch(function(error){
		return res.status(400).json({
			error: error
		})
	})
}

// get all events posted by the user and the friends of the user
module.exports.getEventsFeeds = function(req,res){
	// get the user id
	var userId = req.user.id;

	"select events.* from events where userId = req.user.id or userId in friends_ids or id in (select eventId from users_events where userId in friends_ids)"

	// select the user ids that are friends of the above user id
	sequelize.query("SELECT users.id FROM `users` WHERE users.id IN (SELECT friendId FROM users_friends WHERE userId = "+userId+") OR users.id IN (SELECT userId FROM users_friends WHERE friendid = "+userId+") OR users.id = "+userId,{ type: sequelize.QueryTypes.SELECT}).then((friends)=>{

			// map them in an array friends_ids
			var friends_ids = [];
			friends.map(function(friend){
				friends_ids.push(friend.id);
			})

			if (friends_ids.length > 0){
				// get the events where userId is in the friends_ids
				sequelize.query("SELECT * from events where userId = "+req.user.id+" or userId in ("+friends_ids+") ORDER BY createdAt DESC",{ type: sequelize.QueryTypes.SELECT }).then( (events)=>{

						return res.status(200).json({
							events:events
						});
					} ).catch((error)=>{
						return res.status(400).json({
							error: error
						});
					});	
			}else{
				return res.status(200).json({
					message: "you have no events"
				})
			}

			
		});
}

module.exports.markAsGoing = function(req,res){
	sequelize.query("select * from users_events where users_events.userId = "+req.user.id+" and users_events.eventId = "+ req.params.eventId,{ type: sequelize.QueryTypes.SELECT}).then(function(users_events){
			console.log(users_events);
			if(users_events.length > 0){
				Model.UserEvent.findById(users_events[0].id).then(function(user_event){
					user_event.update({
						status: "going"
					}).then(function(){
						Model.Feed.create({
							userId: req.user.id,
							feedType: "Event",
							feedTypeId: req.body.eventId,
							status: "going"
						});
						return res.status(200).json({
							event: users_events[0]
						})
					}).catch(function(error){
						return res.status(400).json({
							error: error
						})
					})	
				})
				
			}else{
				Model.UserEvent.create({
					userId: req.user.id,
					eventId: req.params.eventId,
					status: "interested"
				}).then(function(userevent){
					Model.Feed.create({
						userId: req.user.id,
						feedType: "Event",
						feedTypeId: req.params.eventId,
						status: "interested"
					});
					return res.status(200).json({
						message: "event successfully marked as interested"
					})
				}).catch(function(error){
					return res.status(400).json({
						error: error
					})
				})		
			}
	})
}

module.exports.markAsInterested = function(req,res){
	sequelize.query("select * from users_events where users_events.userId = "+req.user.id+" and users_events.eventId = "+ req.params.eventId,{ type: sequelize.QueryTypes.SELECT}).then(function(users_events){
			console.log(users_events);
			if(users_events.length > 0){
				Model.UserEvent.findById(users_events[0].id).then(function(user_event){
					user_event.update({
						status: "interested"
					}).then(function(){
						Model.Feed.create({
							userId: req.user.id,
							feedType: "Event",
							feedTypeId: req.body.eventId,
							status: "interested"
						});
						return res.status(200).json({
							event: users_events[0]
						})
					}).catch(function(error){
						return res.status(400).json({
							error: error
						})
					})	
				})
				
			}else{
				Model.UserEvent.create({
					userId: req.user.id,
					eventId: req.params.eventId,
					status: "interested"
				}).then(function(userevent){
					Model.Feed.create({
						userId: req.user.id,
						feedType: "Event",
						feedTypeId: req.params.eventId,
						status: "interested"
					});
					return res.status(200).json({
						message: "event successfully marked as interested"
					})
				}).catch(function(error){
					return res.status(400).json({
						error: error
					})
				})		
			}
	})
	
}

module.exports.getInterestedEvents = function(req,res){
	sequelize.query("SELECT events.* FROM events WHERE id IN (SELECT users_events.eventId FROM `users_events` WHERE users_events.userId = "+req.user.id + " and status='interested')",{ type: sequelize.QueryTypes.SELECT}).then(function(events){

		return res.status(200).json({
			events: events
		})
	}).catch(function(error){
		return res.status(400).json({
			error: error
		})
	});
}

module.exports.getGoingEvents = function(req,res){
	sequelize.query("SELECT events.* FROM events WHERE id IN (SELECT users_events.eventId FROM `users_events` WHERE users_events.userId = "+req.user.id + " and status='going')",{ type: sequelize.QueryTypes.SELECT}).then(function(events){

		return res.status(200).json({
			events: events
		})
	}).catch(function(error){
		return res.status(400).json({
			error: error
		})
	});	
}