// If the user requests a route, controller has a set of actions to be taken for that route
// home controller will take care of all the routes as www.example.come/home/route

// Syntax : module.exports.actionName = function (req,res) {};

module.exports.home = function (req,res){             // Module.exports because we want to send this function to route when home page route is requested
   return res.render('home', {
    title: "Home Page "
});
}