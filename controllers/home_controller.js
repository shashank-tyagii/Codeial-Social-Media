// If the user requests a route, controller has a set of actions to be taken for that route
// home controller will take care of all the routes as www.example.come/home/route

// Syntax : module.exports.actionName = function (req,res) {};

const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = function (req,res){             // Module.exports because we want to send this function to route when home page route is requested
    //console.log(req.cookies);                         // Request data from cookies
    // res.cookie('user_id', 25);                        // Change cookie data

    // To show all the posts on Home page
     Post.find().
     populate('user')              // This function will replace the user ID with user document in the posts
    .populate({                    // Populate all users from comment array
        path: 'comments',
        populate: {
            path: 'user'
        }
    }).
     then(function(posts){
        // show thw friends list and posts
        User.find({}).then(function(users){
            return res.render('home', {
                title: "Home Page ",
                posts : posts,
                all_users : users        
         })
        });
        
      }).catch((err)=>{
      console.log(err);
     });
    }


// Each post document has user object ID