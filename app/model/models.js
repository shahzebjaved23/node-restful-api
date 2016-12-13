var UserMeta = require('./User.js'),
    PostMeta = require('./Post.js'),
    PhotoMeta = require('./Photo.js'),
    connection = require('../sequelize.js')


var User = connection.define('users', UserMeta.attributes, UserMeta.options),
  Post = connection.define('posts', PostMeta.attributes, PostMeta.options),
  Photo = connection.define('photos', PhotoMeta.attributes, PhotoMeta.options);
  


User.hasMany(Post);
Post.belongsTo(User);
User.hasMany(Photo);
Photo.belongsTo(User);

module.exports.User = User
module.exports.Post = Post
module.exports.Photo = Photo
