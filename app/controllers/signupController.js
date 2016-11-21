var bcrypt = require('bcrypt'),
    Model = require('../model/models.js')

module.exports.show = function(req, res) {
  res.render('signup')
}

module.exports.signup = function(req, res) {
  var username = req.body.username
  var password = req.body.password
  var password2 = req.body.password_confirmation
  
  if (!username || !password || !password2) {
    return res.status(200).json({
      error: "Incomplete Data"
    });
  }
  
  if (password !== password2) {
    return res.status(200).json({
      error: "Password Mismatch"
    });
  }
  
  var salt = bcrypt.genSaltSync(10)
  var hashedPassword = bcrypt.hashSync(password, salt)
  
  var newUser = {
    username: username,
    salt: salt,
    password: hashedPassword
  }
  
  Model.User.create(newUser).then(function() {
    return res.status(200).json({
      status: "success",
      id: newUser.id,
      username: newUser.username,
    });

  }).catch(function(error) {
    return res.status(200).json({
      error: error
    });
  })
}
