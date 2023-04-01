// This fill will have all the user path www.example.com/users/route
const User = require('../models/user');

module.exports.profile = function (req,res){             // Module.exports because we want to send this function to route when home page route is requested
    /*return res.render('user_profile', {
        title: "My profile "
    }); */

    // User-id we stored in cookies 
    if (req.cookies.user_id){
        User.findById(req.cookies.user_id).then(function(user){
            if (user){
                return res.render('user_profile', {
                    title: "My Profile",
                    user: user
                })
            }else{
                return res.redirect('/users/sign-in');

            }
        });
    }else{
        return res.redirect('/users/sign-in');

    }
}

// Render Sign-In page
module.exports.signIn = function (req,res){             
    return res.render('user_sign_in', {
        title: "Codeial | Sign In "
    });
}

// Render Sign-Up page
module.exports.signUp = function (req,res){             
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up "
    });
}

// To get the Sign-up data
module.exports.create = function (req,res){             
    // First import the user schema at the top of the controller
   
    // if Passwords didn't match
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email }).then(function(user){
        
        if (!user){    // User not present in DB
            User.create(req.body).then(function(user){    // create user
            return res.redirect('/users/sign-in');
            }).catch((err)=>{
                console.log("error in creating user while signing up");
            });
        }else{       // user already in DB, sign-in
            return res.redirect('back');
        };

    })
    .catch((err)=>{
        console.log("error in finding user in signing up");
    });
}


// To get the Sign-In data
module.exports.createSession = function (req,res){             
    
    // 1. Find the user
    User.findOne({email: req.body.email }).then(function(user){
        
        if (user){    // User is present in DB
            // handle password which doesn't match
            if (user.password != req.body.password){
                return res.redirect('back');
            }
            // handle session creation
            res.cookie('user_id', user.id); 
            return res.redirect('/users/profile');
        }else{                                         // User not found
             return res.redirect('back');             
        };

    })
    .catch((err)=>{
        console.log("error in finding user in signing in");
    });

}

module.exports.deleteSession = function(req,res){
    res.clearCookie('user_id');                        // Change cookie data
    return res.render('user_sign_in', {
    title: "Codeial | Sign In "
});
}