const passport= require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT= require('passport-jwt').ExtractJwt;

const User = require('../models/user');

// options to control how the token is extracted from the request or verified
let opts = {                                      
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken,
    secretOrKey : 'codeial',                     // Acts as a key to encrypt and decrypt
}

passport.use(new JWTStrategy(opts, function(jwtPayload,done){
    if (err){ console.log('Error JWT : ', err); return;}

    if(user){
        return done(null,user);
    }else {
        return done(null,false);
    }
}));

module.exports = passport;