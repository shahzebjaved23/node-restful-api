"use strict";
var passport = require("passport"),
  jwt = require("jsonwebtoken"),
  Model = require('../model/models.js'),
  bcrypt = require('bcrypt');

module.exports.signin = function(req, res) {
  let username = req.body.username;
  let password = req.body.password;
  Model.User.findOne({
    where: {
      'username': username
    }
  }).then(function (user) {
    if (user == null) {
      return res.status(400).json({ success: false, message: 'Authentication failed. Invalid information.' });
    }

    var hashedPassword = bcrypt.hashSync(password, user.salt);
    if (user.password === hashedPassword) {
      var token = jwt.sign({
        id: user.id
      }, process.env.SECRET_TOKEN, {
        expiresIn: 3200
      });
      return res.status(200).json({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        full_name: user.full_name,
        token: token,
        profile_image: user.profile_image,
      });

    } else {
      return res.status(400).json({ success: false, message: 'Authentication failed. Invalid information.' });
    }
  })

}

