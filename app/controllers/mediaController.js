"use strict";
var Model = require('../model/models.js'),
  S3Upload = require('../modules/S3Upload.js'),
  _ = require('lodash');

module.exports.create = function(req, res) { 
  let fileName = req.body.fileName,
    fileDATA = req.body.fileData,
    randomID = _.random(1, 55555);
  let dirName = `public/uploads/media/${randomID}/${fileName}`;
  let fileUrl = `https://${process.env.SHAFUL_S3_BUCKET}.s3.amazonaws.com/${dirName}`;

  S3Upload.upload(dirName, fileDATA, function(error, data) {
    res.status(200).json({
      fileUrl: fileUrl
    });
  });
}

