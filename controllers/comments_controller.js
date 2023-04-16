const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');
const commentEmailWorker = require('../workers/comment_email_worker');
// const queue = require('../config/kue');
const Like = require('../models/like');

module.exports.create = async function(req, res){

    try{
        let post = await Post.findById(req.body.post);

        // //Check whether the post exist or not for which comment is received
        if (post){                                  
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post, 
                user: req.user                   // save user ID in the comments
            });

            post.comments.push(comment);             // Add this comments to the Post -> comment array
            post.save();

            // comment = await comment.populate('user', 'name email').execPopulate();
            commentsMailer.newComment(comment);

            // We need redis-server to set job ID
            // let job = queue.create('emails', comment).save(function(err){
            //     if (err){console.log('Error in sending to queue', err); return; }
            //     console.log('Job enqueued', job.id);
            // });


            if (req.xhr){
                // Similar for comments to fetch the user's id!
                
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Post created!"
                });
            }

            res.redirect('/');
        }
    }catch(err){
        console.log('Error', err);
        return;
    }
    
}

module.exports.destroy = async function(req, res){

    try{
        let comment = await Comment.findById(req.params.id);

        // Checking whether the person deleting the comment is the same who created it
        if (comment.user == req.user.id){

            let postId = comment.post;

            comment.deleteOne();

            let post = Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});

            // CHANGE :: destroy the associated likes for this comment
            await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});
             
            // send the comment id which was deleted back to the views
             if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post deleted."
                });
            }

            return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    }catch(err){
        console.log('Error', err);
        return;
    }
    
}