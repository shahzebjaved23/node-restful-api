var UserMeta = require('./User.js'),
    PostMeta = require('./Post.js'),
    PhotoMeta = require('./Photo.js'),
    UsersFriend = require('./UsersFriend.js'),
    connection = require('../sequelize.js')


var User = connection.define('users', UserMeta.attributes, UserMeta.options),
  Post = connection.define('posts', PostMeta.attributes, PostMeta.options),
  Photo = connection.define('photos', PhotoMeta.attributes, PhotoMeta.options),
  UsersFriend = connection.define('users_friends', UsersFriend.attributes, UsersFriend.options);


User.hasMany(Post);
Post.belongsTo(User);
User.hasMany(Photo);
Photo.belongsTo(User);
User.belongsToMany(User, { as: 'Friends', through: 'users_friends', foreignKey: 'userId' })

module.exports.connection = connection
module.exports.User = User
module.exports.Post = Post
module.exports.Photo = Photo
module.exports.UsersFriend = UsersFriend
