// This fill will have all the user path www.example.com/users/route

module.exports.profile = function (req,res){             // Module.exports because we want to send this function to route when home page route is requested
    return res.render('user_profile', {
        title: "My profile "
    });
}