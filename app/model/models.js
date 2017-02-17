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
    JobCategoryMeta = require("./JobCategory.js"),
    ResumeMeta = require('./Resume.js'),
    ProjectMeta = require('./Project.js'),
    ExperienceMeta = require('./Experience.js'),
    DegreeMeta = require('./Degree.js'),
    ProfileMeta = require('./Profile.js'),
    EventMeta = require('./Event.js'),
    UserEventMeta = require('./UserEvent.js'),
    AlbumMeta = require('./Album.js'),
    ConnectionMeta = require('./Connection.js');




var User = connection.define('users', UserMeta.attributes, UserMeta.options),
  Post = connection.define('posts', PostMeta.attributes, PostMeta.options),
  Photo = connection.define('photos', PhotoMeta.attributes, PhotoMeta.options),
  UsersFriend = connection.define('users_friends', UsersFriendMeta.attributes, UsersFriendMeta.options),
  Video = connection.define('videos', VideoMeta.attributes, VideoMeta.options),
  Like = connection.define('likes',LikeMeta.attributes,LikeMeta.options),
  Comment = connection.define('comments',CommentMeta.attributes,CommentMeta.options),
  Feed = connection.define("feeds",FeedMeta.attributes,FeedMeta.options),
  Job = connection.define("jobs",JobMeta.attributes,JobMeta.options),
  JobApplicant = connection.define("jobs_applicants",JobApplicantMeta.attributes,JobApplicantMeta.options),
  JobCategory = connection.define("job_categories",JobCategoryMeta.attributes,JobCategoryMeta.options),
  Resume = connection.define("resumes",ResumeMeta.attributes,ResumeMeta.options),
  Project = connection.define("projects",ProjectMeta.attributes,ProjectMeta.options),
  Experience = connection.define("experiences",ExperienceMeta.attributes,ExperienceMeta.options),
  Degree = connection.define("degrees",DegreeMeta.attributes,DegreeMeta.options),
  Profile = connection.define("profiles",ProfileMeta.attributes,ProfileMeta.options),
  Event = connection.define("events",EventMeta.attributes,EventMeta.options),
  UserEvent = connection.define("users_events",UserEventMeta.attributes,UserEventMeta.options),
  Album = connection.define("albums",AlbumMeta.attributes,AlbumMeta.options),
  Connection = connection.define("connections",ConnectionMeta.attributes,ConnectionMeta.options);


User.hasMany(Post);
Post.belongsTo(User);
User.hasMany(Photo);
User.hasMany(Video);
Photo.belongsTo(User);
Video.belongsTo(User);

User.hasMany(Album);
Album.belongsTo(User);
Album.hasMany(Photo);
Photo.belongsTo(Album)

User.belongsToMany(User, { as: 'Friends', through: 'users_friends', foreignKey: 'userId' })

Feed.belongsTo(User,{as: "commentUser", foreignKey: "commentUserId"})
Feed.belongsTo(User);
Feed.belongsTo(User,{as: "likeUser", foreignKey: "likeUserId"})


User.hasMany(Job)

User.hasOne(Profile)
Profile.belongsTo(User)

User.hasMany(Comment)
Comment.belongsTo(User)

Job.belongsToMany(User,{as: "Applicants", through: "jobs_applicants", foreignKey:"userId"})

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

User.hasMany(Event);
Event.belongsTo(User);

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
module.exports.Resume = Resume
module.exports.Project = Project
module.exports.Degree = Degree
module.exports.Experience = Experience
module.exports.Profile = Profile
module.exports.Event = Event
module.exports.UserEvent = UserEvent
module.exports.Album = Album
module.exports.Connection = Connection