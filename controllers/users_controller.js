// This fill will have all the user path www.example.com/users/route
const User = require('../models/user');
const path = require('path');
const fs = require('fs');
const Friendships = require("../models/friendship");

// Auth for profile is handled in route itself
// module.exports.profile = function (req,res){             // Module.exports because we want to send this function to route when home page route is requested
//     User.findById(req.params.id).then(function(user){
//         return res.render('user_profile', {
//             title: "My profile ",
//             profile_user : user
//         });
//     }); }

module.exports.profile = async function (request, response) {
    try {
     
      let user = await User.findOne({ _id: request.params.id });
  
      let friendship1,friendship2
  
      friendship1 = await Friendships.findOne({
        from_user: request.user,
        to_user: request.params.id,
      });
  
      friendship2 = await Friendships.findOne({
        from_user: request.params.id,
        to_user: request.user,
      });
  
      
      let populated_user = await User.findById(request.user).populate('friendships');
      return response.render("user_profile", {
        title: "Codeial | Profile",
        profile_user: user,
        populated_user: populated_user
      });
    } catch (error) {
      console.log("Error", error);
      return;
    }
  };

module.exports.update = async function (req,res){             
    if(req.user.id == req.params.id){
        try {
            let user = await User.findByIdAndUpdate(req.params.id);
           
            // Multer will process the request and make available all the details and file related details
            User.uploadedAvatar(req,res,function(err){              
                if(err){console.log('Multer error : ', err)};
                // console.log(req.file);

                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){
                    //If avatar is already present, replace it.
                    if(user.avatar){           
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }
                    // This is saving the path of the uploaded file into the avatar field of the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                    console.log(user.avatar);
                }
                user.save();
                return res.redirect('back');
            });

        } catch(error){
            req.flash('error', 'Update failed');
            return res.redirect('back');
        }
        }
    else{
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
module.exports.create = async function (req,res){             
    // First import the user schema at the top of the controller
   
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    let user = await User.findOne({email: req.body.email });
     
    if (!user){    // User not present in DB
        User.create(req.body).then(function(user){
        req.flash('success', 'User created successfully');
        return res.redirect('/users/sign-in');
        }).catch((err)=>{
            console.log("error in creating user while signing up");
        });
    }else{
        return res.redirect('back');
    };

}


// To get the Sign-In data
module.exports.createSession = function (req,res){      
    req.flash('success', 'Logged In successfully'); // Toast/flash message       
    return res.redirect('/');   // Middleware is handling session now, check routes 
}

// To get the Sign-In data
module.exports.deleteSession = function (req,res){             
    req.logout(function(err) {
        if (err) { 
          return next(err); 
          }
          req.flash('success', 'Logged Out successfully'); // Toast/flash message
          res.redirect('/');
      });
   
}





