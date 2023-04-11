const Post = require('../../../models/post');
const Comment= require('../../../models/comment');

module.exports.index = async function(req,res){

      // To get all the posts on Home page
      let posts = await Post.find().populate('user')      // Populate - This function will replace the user ID with user document in the posts
      .sort('-createdAt')
      .populate({                                        // Populate all users from comment array
          path: 'comments',
          populate: {
              path: 'user'
          } });


    return res.status(200).json( {
        message : "List of posts",
        posts : posts,
    })
};



// Delete a post and associated comments - authorization
module.exports.destroy = async function(req, res){
    try {
        let post = await Post.findById(req.params.id);
        
        if (post.user == req.user.id){
            post.deleteOne();
    
            // Delete all the comments on this post i.e all the comments having post ID as the query ID
             await Comment.deleteMany({post : req.params.id});

            return res.status(200).json({
            message : " Post and associated comments deleted successfully"
        });
        } else{
            return res.status(401).json({
            message : 'Internal server errror'
        });
        }
        
    } 
    catch(err){
        return res.status(500).json({
            message : " Internal server errror",
        })
    }
    

}