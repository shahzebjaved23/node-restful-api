var Model = require("../model/models.js");

module.exports.index = function(req, res) {
  Model.User.findById(req.user.id).then((user) =>{
    user.getPosts().then( (posts) => {
      res.status(200).json({
        posts: posts
      });
    })
  });
}
