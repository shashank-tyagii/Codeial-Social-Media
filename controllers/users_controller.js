// This fill will have all the user path www.example.com/users/route
const User = require('../models/user');

// Auth for profile is handled in route itself
module.exports.profile = function (req,res){             // Module.exports because we want to send this function to route when home page route is requested
    User.findById(req.params.id).then(function(user){

        return res.render('user_profile', {
            title: "My profile ",
            profile_user : user
        });

    })
    
}

module.exports.update = function (req,res){             
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body).then(function(user){
            return res.redirect('back');
        });
    }else{
        return res.status(401).send('Unauthorized');
    }

}


// Render Sign-In page
module.exports.signIn = function (req,res){   
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }          
    return res.render('user_sign_in', {
        title: "Codeial | Sign In "
    });
}

// Render Sign-Up page
module.exports.signUp = function (req,res){  
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }           
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
    return res.redirect('/');   // Middleware is handling session now, check routes 
}

// To get the Sign-In data
module.exports.deleteSession = function (req,res){             
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
}





