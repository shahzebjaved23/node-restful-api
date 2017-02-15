"use strict";
var Model = require('../model/models.js'),
  Sequelize = require('sequelize'),
  _ = require('lodash');

var sequelize = require("../sequelize.js");

module.exports.index = function(req, res) {

  // get the user id
  var userId = req.user.id;

  // select the user ids that are friends of the above user id
  sequelize.query("SELECT users.id FROM `users` WHERE users.id IN (SELECT friendId FROM users_friends WHERE userId = "+userId+") OR users.id IN (SELECT userId FROM users_friends WHERE friendId = "+userId+")",{ type: sequelize.QueryTypes.SELECT}).then((friends)=>{

      // map them in an array friends_ids
      var friends_ids = [];
      friends.map(function(friend){
        friends_ids.push(friend.id);
      })

      if (friends_ids.length > 0){
        // get the posts and photos of the friends_ids
        Model.User.findAll({
          where:{
            id:{
              $in: friends_ids  
            } 
          }
        })
        .then( (friends)=>{
            return res.status(200).json({
              friends:friends
            });
          } ).catch((error)=>{
            return res.status(400).json({
              error: error
            });
          }); 
      }else{
        return res.status(200).json({
          message: "you have no friends"
        })
      }

      
    });
}


module.exports.add = function(req, res) {

  var attrs = {}
  attrs["userId"] = req.user.id;
  attrs["friendId"] =  req.body.friendId
  Model.UsersFriend.findOrCreate({where: attrs}).then((data) => {
    return res.status(200).json({
      user_friend: data
    });
  });
}
module.exports.search = function(req, res) {
  var term = req.body.term
  Model.connection.query('SELECT *, EXISTS(SELECT * from users_friends as ufo where ufo.userId = :userId AND ufo.friendId = users.id) as connected FROM users where users.id != :userId and (users.firstName = "%:term%" or users.lastName = "%:term%") ',
    {replacements: { userId: req.user.id, term: term }, type: Sequelize.QueryTypes.SELECT }).then((data) => {
      var friends = _.map(data, (hsh) => {
        var fileName = "public/uploads/users/" + hsh.id + "/" + hsh.image;
        fileName = `https://${process.env.SHAFUL_S3_BUCKET}.s3.amazonaws.com/${fileName}`;
        return {
          fullName: hsh.firstName + hsh.lastName,
          id: hsh.id,
          profile_picture: fileName,
          connected: hsh.connected
        };
      });
      return res.status(200).json({
        friends: friends
      })
    });

}


/*
gets all the friend requests of the user
in the users_friends table, 
    userId corresponds to sender
    friendId corresponds to reciever 
*/ 
module.exports.getFriendRequests = function(req,res){
  var userId = req.user.id;
  
  sequelize.query("(select userId from users_friends where friendId="+userId+" and status='pending')", {type: Sequelize.QueryTypes.SELECT }).then(function(data){
    
    var request_ids = data.map(function(data){
      return data.userId
    })
    
    Model.User.findAll({
      where:{
        id:{
          $in:request_ids
        }
      }
    }).then(function(data){
      return res.status(200).json({
        RequestsBy: data
      })  
    })

    
  });
}

/*
method: post,
url: /send_friend_request,
params: friendId,
response: {
  message: 'request sent successfully'
}
*/
module.exports.sendFriendRequest = function(req,res){
  var userId = req.user.id;
  var friendId = req.body.friendId;

  Model.UsersFriend.create({
    userId: userId,
    friendId: friendId,
    status: "pending"
  })
  .then(function(data){
    return res.status(200).json({
      message: "request sent successfully"
    })
  })
  .catch(function(error){
    return res.status(400).json({
      error: error
    })
  })
}


/*
method: post,
url: /accept_friend_request,
params: requestId,
response: {
  message: 'friend request accepted'
}
*/
module.exports.acceptFriendRequest= function(req,res){
  var userId = req.user.id;
  var requestId = req.body.requestId;

  Model.UsersFriend.findById(requestId).then(function(data){
    data.update({
      status: "done"
    })
    .then(function(users_friends){
      return res.status(200).json({
        message: "friend request accepted"
      })
    })
    .catch(function(error){
      return res.status(400).json({
        error: error
      })
    });
  })
}

// cancel friend request
module.exports.cancelFriendRequest = function(req,res){
  var requestId = req.body.requestId;

  Model.UsersFriend.findById(requestId)
  .then(function(request){
    request.destroy().then(function(){
      return res.status(200).json({
        message: "friend Request cancelled successfully"
      })
    }).catch(function(error){
      return res.status(400).json({
        error: error
      })
    });
  })
  .catch(function(error){
    return res.status(400).json({
      error: error
    })
  })
}

// delete friend
module.exports.removeFriend = function(req,res){
  var friendId = req.body.friendId;
  var userId = req.user.id;

  sequelize.query("Delete from users_friends where (userId="+userId+" and friendId="+friendId+") or (userId="+friendId+" and friendId="+userId+")").then(function(){
    res.status(200).json({
      message: "Friend successfully removed"
    })
  }).catch(function(error){
    return res.status(400).json({
      error: error
    })
  })
  
}
