const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function (req,res){
    Post.create({
        content : req.body.content,
        user : req.user._id,
    }).then(function(post){
        return res.redirect('/');
    }).catch((err)=>{
        console.log("Error in creating a post");
    })

}

// Delete a post and associated comments
module.exports.destroy = function(req, res){
    Post.findById(req.params.id).then (function(post){
        // .id means converting the object id(_id) into string
        if (post.user == req.user.id)        {               // checking whether the person deleting the post is the same who created it
            post.remove();

            // Delete all the comments on this post i.e all the comments having post ID as the query ID
            Comment.deleteMany({post : req.params.id}). then(function(){
                return res.redirect('back');
            });

        } 
        return res.redirect('back');
    })
}