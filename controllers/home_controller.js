// If the user requests a route, controller has a set of actions to be taken for that route
// home controller will take care of all the routes as www.example.come/home/route

// Syntax : module.exports.actionName = function (req,res) {};

const Post = require('../models/post');
const User = require('../models/user');
const Friendships = require("../models/friendship");

module.exports.home = async function (req,res){          // Module.exports because we want to send this function to route when home page route is requested
    //console.log(req.cookies);                          // Request data from cookies
    // res.cookie('user_id', 25);                        // Change cookie data

    try {

         // To show all the posts on Home page

        let posts = await Post.find({})
        .sort("-createdAt")
        .populate("user")                          // Populate - This function will replace the user ID with user document in the posts
        .populate({
            path: "comments",
            populate: {
            path: "user",
            },
        })
        .populate({
            path: "comments",
            populate: {
            path: "likes",
            },
        })
        .populate("likes");
 
        // To find all the friends of the user on the Home page
        let users = await User.find({});

        let user;
        if (req.user) {
        user = await User.findById(req.user._id)
            .populate({
            path: "friendships",
            populate: {
                path: "from_user",
            },
            })
            .populate({
            path: "friendships",
            populate: {
                path: "to_user",
            },
            });
        }
 
        return res.render('home', {
            title: "Home Page ",
            posts : posts,
            all_users : users,
            user: user,    
            })
 
    } catch(err){
        console.log(err);
    }
    
}


// Each post document has user object ID