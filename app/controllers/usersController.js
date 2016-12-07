var Model = require("../model/models.js");

module.exports.update = function(req, res) {
  let attrs = {};
  attrs["firstName"] = req.body.firstName;
  attrs["lastName"] = req.body.lastName;
  Model.User.update(attrs, {where: {id: req.user.id}})
    .then(function(results){
      Model.User.findById(req.user.id).then((user) => {
        res.status(200).json({
          user: user
        })
      });
    })
    .catch(function(error) {
      res.status(400).json({error: error});
    });
}
