const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.ObjectId,
    },
// This defines the Object ID of the liked post/comment
    likeable : {
        type : mongoose.Schema.ObjectId,
        require : true,
        refPath : 'onModel',                         // Dynamic reference
    },
// Used for defining the type of liked object since it is a dynamic refrence
    onModel : {
        type : String,
        reuired : true,
        enum : ['Post', 'Comment']
    },
}, {
   timestamps : true, 
});

const Like = mongoose.model('Like', likeSchema);

module.exports= Like;