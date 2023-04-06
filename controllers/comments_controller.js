const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req, res){

    try{
        let post = await Post.findById(req.body.post);

        // //Check whether the post exist or not for which comment is received
        if (post){                                  
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post, 
                user: req.user._id                   // save user ID in the comments
            });

            post.comments.push(comment);             // Add this comments to the Post -> comment array
            post.save();

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

            return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    }catch(err){
        console.log('Error', err);
        return;
    }
    
}