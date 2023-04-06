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


module.exports.destroy = function (req,res){
    Comment.findById(req.params.id).then (function(comment){
        // .id means converting the object id(_id) into string
        if (comment.user == req.user.id)        {               // checking whether the person deleting the comment is the same who created it
            let postId = comment.post;
            comment.deleteOne();
            
            Post.findByIdAndUpdate(postId, {$pull : {comments : req.params.id}} ).then (function(post){
                return res.redirect('back');
            });

        } else {
            return res.redirect('back');
        }
        
    })
}