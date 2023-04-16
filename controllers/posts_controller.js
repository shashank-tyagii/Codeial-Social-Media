const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');

module.exports.create = async function (req,res){
    try {
        let post = await Post.create({
            content : req.body.content,
            user : req.user._id,
        });

        if (req.xhr){                               //XMLHTTPRequest -> AJAX request
             // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
             post = await post.populate('user', 'name').execPopulate();

            return res.status(200).json({
                data : {
                    post : post
                },
                message : 'Post created !'
            });
        }

            req.flash('success', 'Post added successfully');
            return res.redirect('/');

    } catch (err){
        req.flash('error', err);
        // added this to view the error on console as well
        console.log(err);
        return res.redirect('back');
    }
    
}

// Delete a post and associated comments
module.exports.destroy = async function(req, res){
    let post = await Post.findById(req.params.id);
        // .id means converting the object id(_id) into string
    if (post.user == req.user.id)        {               // checking whether the person deleting the post is the same who created it
        
         // CHANGE :: delete the associated likes for the post and all its comments' likes too
         await Like.deleteMany({likeable: post, onModel: 'Post'});
         await Like.deleteMany({_id: {$in: post.comments}});
        
        
        post.deleteOne();

        // Delete all the comments on this post i.e all the comments having post ID as the query ID
        await Comment.deleteMany({post : req.params.id});

        if(req.xhr){
            return res.status(200).json({
                data : {
                    post_id : req.params.id
                },
                message : 'Post deleted'
            })
        }
        req.flash('success', 'Post and associated comments deleted successfully');
        return res.redirect('back');

    } else {
        return res.redirect('back');
    }   
}