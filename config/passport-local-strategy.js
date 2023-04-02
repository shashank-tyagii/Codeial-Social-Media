const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');   // import db schema

//Authentication using passport
passport.use(new LocalStrategy({
    usernameField : 'email'             // In DB schma, username is the email
}, 
function(email, password, done) {
    User.findOne({ email: email }).then ((user) => {  
      if (!user) {             // User not found
        console.log('User not found');
        return done(null, false); 
        }
      if (user.password != password) { 
        console.log('Invalid Password');
        return done(null, false); 
    }
    // User and password matches
      return done(null, user);
    }).catch((err)=>{
            console.log('Error in finding user --> Paassport'); 
            return done(err); 
    });
  }
));

// Serialize the user to tell which key is to be stored in cookies

passport.serializeUser(function(user,done){
     done( null, user.id);
});

//deserializing user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id).then(function(user){
        return done(null, user);
    }
    ).catch((err)=>{
        console.log("Unable to fetch User");
        return done(err);
    });
})


module.exports= passport;