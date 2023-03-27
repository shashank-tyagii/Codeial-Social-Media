// If the user requests a route, controller has a set of actions to be taken for that route

// Syntax : module.exports.actionName = function (req,res) {};

module.exports.home = function (req,res){             // Module.exports because we want to send this function to route when home page route is requested
    return res.end('<h1> Welcome to Codeial</h1>');
}