"use strict";
var UserMeta = require('./User.js'),
    PostMeta = require('./Post.js'),
    PhotoMeta = require('./Photo.js'),
    UsersFriendMeta = require('./UsersFriend.js'),
    VideoMeta = require('./Video.js'),
    connection = require('../sequelize.js'),
    LikeMeta= require('./Like.js'),
    CommentMeta = require('./Comment.js'),
    FeedMeta = require("./Feed.js"),
    JobMeta = require("./Job.js"),
    JobApplicantMeta = require("./JobApplicant.js"),
    JobCategoryMeta = require("./JobCategory.js");



var User = connection.define('users', UserMeta.attributes, UserMeta.options),
  Post = connection.define('posts', PostMeta.attributes, PostMeta.options),
  Photo = connection.define('photos', PhotoMeta.attributes, PhotoMeta.options),
  UsersFriend = connection.define('users_friends', UsersFriendMeta.attributes, UsersFriendMeta.options),
  Video = connection.define('videos', VideoMeta.attributes, VideoMeta.options),
  Like = connection.define('likes',LikeMeta.attributes,LikeMeta.options),
  Comment = connection.define('comments',CommentMeta.attributes,CommentMeta.options),
  Feed = connection.define("feeds",FeedMeta.attributes,FeedMeta.options),
  Job = connection.define("jobs",JobMeta.attributes,JobMeta.options),
  JobApplicant = connection.define("job_applicants",JobApplicantMeta.attributes,JobApplicantMeta.options),
  JobCategory = connection.define("job_categories",JobCategoryMeta.attributes,JobCategoryMeta.options);


User.hasMany(Post);
Post.belongsTo(User);
User.hasMany(Photo);
User.hasMany(Video);
Photo.belongsTo(User);
Video.belongsTo(User);

User.belongsToMany(User, { as: 'Friends', through: 'users_friends', foreignKey: 'userId' })

User.hasMany(Job)

Job.belongsTo(User,{foreignKey: "userId"})
Job.belongsTo(JobCategory,{foreignKey: "job_category_id"})
JobCategory.hasMany(Job)

Post.hasMany(Like);
Photo.hasMany(Like);
Like.belongsTo(Post);
Like.belongsTo(Photo);

Post.hasMany(Comment);
Photo.hasMany(Comment);
Comment.belongsTo(Post);
Comment.belongsTo(Photo);


module.exports.connection = connection
module.exports.User = User
module.exports.Post = Post
module.exports.Photo = Photo
module.exports.UsersFriend = UsersFriend
module.exports.Video = Video
module.exports.Like = Like
module.exports.Comment = Comment
module.exports.Feed = Feed
module.exports.Job = Job
module.exports.JobApplicant = JobApplicant
module.exports.JobCategory = JobCategory