const mongoose = require('mongoose');

// We are keeping comment as a seperate schema, not in the posts completely to easily fetch the user 
// We will store the comment document ID in each post to easily search for that comment

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    // comment belongs to a user
    user: {
        type: mongoose.Schema.Types.ObjectId,   // user document ID
        ref: 'User'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,    // post document ID
        ref: 'Post'
    },
    likes : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Like'
        }
    ]
},{
    timestamps: true
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;