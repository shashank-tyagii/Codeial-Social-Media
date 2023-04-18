const passport= require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT= require('passport-jwt').ExtractJwt;
const env = require('./environment');
const User = require('../models/user');

// options to control how the token is extracted from the request or verified
let opts = {                                      
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : env.jwt_secret,                     // Acts as a key to encrypt and decrypt
}

passport.use(new JWTStrategy(opts, async function(jwtPayload,done){
   // if (err){ console.log('Error JWT : ', err); return;}
    let user = await User.findById(jwtPayload._id);

    if(user){
        return done(null,user);
    }else {
        return done(null,false);
    }
}));

module.exports = passport;