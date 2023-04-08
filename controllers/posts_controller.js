const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function (req,res){
    try {
        let post = await Post.create({
            content : req.body.content,
            user : req.user,
        });

        if (req.xhr){                               //XMLHTTPRequest -> AJAX request
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
        console.log('Error: ', err);
    }
    
}

// Delete a post and associated comments
module.exports.destroy = async function(req, res){
    let post = await Post.findById(req.params.id);
        // .id means converting the object id(_id) into string
    if (post.user == req.user.id)        {               // checking whether the person deleting the post is the same who created it
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