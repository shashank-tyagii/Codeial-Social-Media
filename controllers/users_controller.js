// This fill will have all the user path www.example.com/users/route
const User = require('../models/user');

module.exports.profile = function (req,res){             // Module.exports because we want to send this function to route when home page route is requested
    return res.render('user_profile', {
        title: "My profile "
    });
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
   
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email }).then(function(user){
     
        if (!user){    // User not present in DB
            User.create(req.body).then(function(user){
            return res.redirect('/users/sign-in');
            }).catch((err)=>{
                console.log("error in creating user while signing up");
            });
        }else{
            return res.redirect('back');
        };

    })
    .catch((err)=>{
        console.log("error in finding user in signing up");
    });
}


// To get the Sign-In data
module.exports.createSession = function (req,res){             
    // To-Do
}