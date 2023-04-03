const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type : String,
        required : true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,   // Object ID is a type of unique ID for a document (_id)
        ref : 'User'
    }, 
    // include the array of ids of all comments in this post schema itself
    comments: [
        {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'comment'
        }
    ]
}, {
    timestamps : true,
}
);
const Post = mongoose.model('Post', postSchema);
module.exports = Post;



/* String , Number , Date , Buffer , Boolean , Mixed , ObjectId ,Array ,Decimal128 ,Map ,Schema, UUID */
// Field - Document - Collection
