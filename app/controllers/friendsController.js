"use strict";
var Model = require('../model/models.js'),
  Sequelize = require('sequelize'),
  _ = require('lodash');

module.exports.index = function(req, res) {
  Model.connection.query('SELECT *, EXISTS(SELECT * from users_friends as ufo where ufo.userId = :userId AND ufo.friendId = users.id) as connected FROM users where users.id != :userId',
    {replacements: { userId: req.user.id }, type: Sequelize.QueryTypes.SELECT })
    .then((data) => {
      var friends = _.map(data, (hsh) => {
        var fileName = "public/uploads/users/" + hsh.id + "/" + hsh.image;
        fileName = `https://${process.env.SHAFUL_S3_BUCKET}.s3.amazonaws.com/${fileName}`;
        return {
          fullName: hsh.firstName + hsh.lastName,
          id: hsh.id,
          profile_picture: fileName,
          connected: hsh.connected
        };
      });
      return res.status(200).json({
        friends: friends
      })
    }).catch(function(error) {
      return res.status(400).json({
        error: error
      });
    });
}

module.exports.add = function(req, res) {

  var attrs = {}
  attrs["userId"] = req.user.id;
  attrs["friendId"] =  req.body.friendId
  Model.UsersFriend.findOrCreate({where: attrs}).then((data) => {
    return res.status(200).json({
      user_friend: data
    });
  });
}
module.exports.search = function(req, res) {
  var term = req.body.term
  Model.connection.query('SELECT *, EXISTS(SELECT * from users_friends as ufo where ufo.userId = :userId AND ufo.friendId = users.id) as connected FROM users where users.id != :userId and (users.firstName = "%:term%" or users.lastName = "%:term%") ',
    {replacements: { userId: req.user.id, term: term }, type: Sequelize.QueryTypes.SELECT }).then((data) => {
      var friends = _.map(data, (hsh) => {
        var fileName = "public/uploads/users/" + hsh.id + "/" + hsh.image;
        fileName = `https://${process.env.SHAFUL_S3_BUCKET}.s3.amazonaws.com/${fileName}`;
        return {
          fullName: hsh.firstName + hsh.lastName,
          id: hsh.id,
          profile_picture: fileName,
          connected: hsh.connected
        };
      });
      return res.status(200).json({
        friends: friends
      })
    });

}
