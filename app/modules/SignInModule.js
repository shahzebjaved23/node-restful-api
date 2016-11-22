var jwt = require('jsonwebtoken');

module.exports.generateToken = function (req, res, next) {
  req.token = jwt.sign({
    id: req.user.id
  }, "jasdjmn1231231", {
    expiresIn: 120
  });
  next();
}
module.exports.serialize = function (req, res, next) {
  next();
}
module.exports.respond = function (req, res) {
  res.status(200).json({
    user: req.user,
    token: req.token
  });
}
