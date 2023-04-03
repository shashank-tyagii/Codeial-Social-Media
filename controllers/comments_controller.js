const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req, res){
    Post.findById(req.body.post).then (function(post){

        if (post){                      //Check whether the post exist or not for which comment is received
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id      // save user ID in the comments
            }).then (function(comment){
                
                post.comments.push(comment);    // Add this comments to the Post -> comment array
                post.save();

                res.redirect('/');
            });
        }

    });
}