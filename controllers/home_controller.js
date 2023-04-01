// If the user requests a route, controller has a set of actions to be taken for that route
// home controller will take care of all the routes as www.example.come/home/route

// Syntax : module.exports.actionName = function (req,res) {};

module.exports.home = function (req,res){             // Module.exports because we want to send this function to route when home page route is requested
    console.log(req.cookies);                         // Request data from cookies
    res.cookie('user_id', 25);                        // Change cookie data
    return res.render('home', {
    title: "Home Page "
});
}