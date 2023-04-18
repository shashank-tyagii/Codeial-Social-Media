const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
const env = require('../../../config/environment');

// To get the Sign-In data
module.exports.createSession = async function (req,res){      
    try{
        let user = await User.findOne({ email : req.body.email   });

        if (!user || user.password != req.body.password){
            return res.status(422).json({
                message : "Invalid username/password"
            });
        }

        return res.status(200).json({
            message : "Sign in successful. Keep your token safe",
            data : {
                token : jwt.sign(user.toJSON(), env.jwt_secret, {expiresIn : 100000})
            }
        })

    } catch (err){
        console.log('Error in JWT Auth', err);
        return res.status(500).json({
            message : 'Internal server errror'
        })
    }
}