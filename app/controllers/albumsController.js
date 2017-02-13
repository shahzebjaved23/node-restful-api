"use strict";
var Model = require('../model/models.js'),
  Sequelize = require('sequelize'),
  _ = require('lodash');

var sequelize = require("../sequelize.js");

module.exports.create = function(req,res){
	Model.Album.create({
		userId: req.user.id,
		name: req.body.name
	}).then(function(album){
		return res.status(200).json({
			album: album
		})
	}).catch(function(error){
		return res.status(400).json({
			error: error
		})
	})

}

module.exports.removeAlbum = function(req,res){
	Model.Album.findOne(req.param.albumId).then(function(album){
		album.destroy().then(function(){
			return res.status(200).json({
				message: "record successfully destroyed"
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

module.exports.addPhoto = function(req,res){
	Model.Photo.findById(req.params.photoId).then(function(photo){
		photo.update({ albumId: req.params.albumId }).then(function(photo){
			return res.status(200).json({
				photo: photo
			})
		})
	}).catch(function(error){
		return res.status(400).json({
			error: error
		})
	})
}

module.exports.removePhoto = function(req,res){
	Model.Photo.findById(req.params.photoId).then(function(photo){
		photo.update({ albumId: null }).then(function(photo){
			return res.status(200).json({
				photo: photo
			})
		})
	}).catch(function(error){
		return res.status(400).json({
			error: error
		})
	})
}

module.exports.getAlbum = function(req,res){
	Model.Photo.findAll({
		where:{
			albumId: req.params.albumId
		}
	}).then(function(photos){
		return res.status(200).json({
			photos: photos
		})
	}).catch(function(error){
		return res.status(400).json({
			error: error
		})
	})
}

module.exports.getAllAlbums = function(req,res){
	Model.User.findById(req.user.id).then(function(user){
		user.getAlbums({include: [Model.Photo]}).then(function(albums){
			return res.status(200).json({
				albums: albums
			})
			
		}).catch(function(error){
			return res.status(400).json({
				error: error
			});
		});
	}).catch(function(error){
		return res.status(400).json({
			error: error
		});
	});
}