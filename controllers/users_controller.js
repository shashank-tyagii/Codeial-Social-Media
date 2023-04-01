// This fill will have all the user path www.example.com/users/route

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
    // To-Do
}

// To get the Sign-In data
module.exports.createSession = function (req,res){             
    // To-Do
}