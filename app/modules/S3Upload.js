"use strict";
var AWS = require('aws-sdk');
module.exports.upload = function(fileNameWithPath, content, callBack) {
  AWS.config.update({accessKeyId: process.env.SHAFUL_ACCESS_KEY_ID, secretAccessKey: process.env.SHAFUL_SECRET_ACCESS_KEY});
  var s3 = new AWS.S3({params: { Bucket: process.env.SHAFUL_S3_BUCKET}});
  // var buf = new Buffer(content.replace(/^data:image\/\w+;base64,/, ""),'base64');

  var data = {
    Key: fileNameWithPath,
    Body: content,
    Bucket: process.env.SHAFUL_S3_BUCKET,
    ContentEncoding: 'base64',
    ContentType: 'image/jpeg'
  }
  s3.putObject(data, callBack);
}

module.exports.uploadVideo = function(fileNameWithPath, content, callBack) {
  AWS.config.update({accessKeyId: process.env.SHAFUL_ACCESS_KEY_ID, secretAccessKey: process.env.SHAFUL_SECRET_ACCESS_KEY});
  var s3 = new AWS.S3({params: { Bucket: process.env.SHAFUL_S3_BUCKET}});
  // var buf = new Buffer(content.replace(/^data:image\/\w+;base64,/, ""),'base64');

  var data = {
    Key: fileNameWithPath,
    Body: content,
    Bucket: process.env.SHAFUL_S3_BUCKET,
    ContentEncoding: 'base64'
  }
  s3.putObject(data, callBack);
}
