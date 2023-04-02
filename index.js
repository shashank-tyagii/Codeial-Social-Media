const express = require('express');
const app = express();
const port = 8000;
const cookieParser = require('cookie-parser');     // parses cookies attached to the client request object
const bodyParser = require('body-parser');         // URL Middleware - to process data sent through an HTTP request body.
const expressLayouts = require('express-ejs-layouts');   // LAYOUT for Views
const db = require ('./config/mongoose');         // Start DB before starting express app

// Used for session cookies and local passport auth - Importing. Using below to routes
const session = require('express-session');
const passport= require('passport');
const passportLocal = require('./config/passport-local-strategy');

const MongoStore = require('connect-mongo');      // to store session data in server cookies
const { Connection } = require('mongoose');

app.use(express.urlencoded({}));                   // Parsing form data from URL - Middleware, not for URL 

// Setup and using cookie parser
app.use(cookieParser());

// setup all Static files - Images, CSS and JS as a middleware to render
app.use (express.static('./assets'));                // Middleware to include CSS,JS, Images etc

// Adding ejs Page layouts. It should be before routes because it will render first layout.ejs
app.use(expressLayouts);
app.set('layout extractStyles', true);   // Extract CSS file to the layout.ejs
app.set('layout extractScripts', true);  // Extract JS file to the lyout.ejs

//setup view engine
app.set('view engine' , 'ejs');
app.set('views' , './views');

// Initiate encryption middleware
app.use(session({
    name: 'codeial',
    // TODO change the secret key before deployment in production mode - private/public key
    secret: 'blahsomething',
    saveUninitialized: false,   // A session that is “uninitialized” not to be saved to the cookies
    resave: false,              // A session that is “initialized” not to be saved again and again 
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store : MongoStore.create (    // used to store session cookies so that everytime i don't need to log-in when server starts
        {
            client : db.getClient(),
            // dbName : 'db',
            autoRemove : 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok')
        }
      )}
));

// Use passport authentication with encryption
app.use(passport.initialize());              // Initiate the auth module
app.use(passport.session());                 // To encrypt/decrypt the cookie (After Serialize/deserialize)
app.use(passport.setAuthenticatedUser);      // Manual function to set user from cookies to locals/views

// routing all the URLs to route index file i.e App should use this file for any URL
app.use('/', require('./routes/index'));


// This code is for setting up and connecting to server
app.listen(port, function(err){
    if (err){
        console.log('Error in running the server : ', err);
    };
    console.log('Server is running on port : ' , port);
})
