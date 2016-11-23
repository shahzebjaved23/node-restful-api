var bcrypt = require('bcrypt'),
    Model = require('../model/models.js')

module.exports.show = function(req, res) {
  res.render('signup')
}

module.exports.signup = function(req, res) {
  console.log(req.body)
  var username = req.body.username
  var password = req.body.password
  var password2 = req.body.password_confirmation
  var email = req.body.email;
  var first_name = req.body.first_name;
  var last_name = req.body.last_name;
  
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
    first_name: first_name,
    last_name: last_name,
    email: email,
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
