"use strict";
var Model = require('../model/models.js'),
  S3Upload = require('../modules/S3Upload.js');

module.exports.index = function (req, res) {
  Model.User.findById(req.user.id).then((user) => {
    user.getPhotos().then( (photos) => {
      res.status(200).json({
        photos: photos
      });
    })
  })
}
module.exports.create = function(req, res) {
  let attrs = {}
  attrs["userId"] = req.user.id;
  attrs['filePath'] = req.body.fileName;
  Model.Photo.create(attrs)
    .then((photo) => {
      var data = req.body.fileData;
      var dirName = `public/uploads/photos/${photo.id}/${photo.filePath}`
      S3Upload.upload(dirName, data, function(error, data) {
        res.status(200).json({
          photo: photo
        });
      });

    })
    .catch((error) => {
      res.status(400).json({
        error: error
      });
    });
}

module.exports.likes = function(req,res){
  var userId = req.user.id;
  var photoId = req.body.photoId;
  
  Model.Like.findAll({
        where: {
          photoId: photoId
        }
      }).then(function(likes){
    return res.status(200).json({likes: likes});
  }).catch(function(error){
    return res.status(400).json({error: error})
  });
}

module.exports.addLike = function(req,res){
  var attrs = {};
  attrs["userId"] = req.user.id;
  attrs["photoId"] = req.params.photoId;
  
  Model.Like.create(attrs).then(function(like){
    return res.status(200).json({ message: "created successfully"});
  }).catch(function(error){
    return res.status(400).json({ error: error});
  });
}


