var UserMeta = require('./User.js'),
    PostMeta = require('./Post.js'),
    connection = require('../sequelize.js')

var User = connection.define('users', UserMeta.attributes, UserMeta.options),
  Post = connection.define('posts', PostMeta.attributes, PostMeta.options);


User.hasMany(Post);
Post.belongsTo(User);
module.exports.User = User
module.exports.Post = Post
