var Model = require('../model/models.js'),
  S3Upload = require('../modules/S3Upload.js');

module.exports.index = function (req, res) {
  Model.User.findById(req.user.id).then( (user) => {
    user.getVideos().then( (videos) => {
      res.status(200).json({
        videos: videos
      })
    });
  })
}
module.exports.create = function(req, res) {
  let attrs = {};
  attrs["userId"] = req.user.id;
  attrs["filePath"] = req.body.fileName;
  Model.Video.create(attrs)
    .then((video) => {
      var data = req.body.fileData,
        dirName = `public/uploads/videos/${video.id}/${video.filePath}`;
      S3Upload.upload(dirName, data, function(error, data) {
        return res.status(200).json({
          video: video
        });
      });
    }).catch( (error) => {
      res.status(400).json({
        error: error
      });
    });

}
