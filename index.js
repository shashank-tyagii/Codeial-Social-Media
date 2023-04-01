const express = require('express');
const app = express();
const port = 8000;
const cookieParser = require('cookie-parser');

// Setup database
const db = require ('./config/mongoose');         // Start DB before starting express app

// Setup and using cookie parser
app.use(cookieParser());

// Adding ejs Page layouts. It should be before routes because it will render first layout.ejs
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('layout extractStyles', true);   // Extract CSS file to the layout.ejs
app.set('layout extractScripts', true);  // Extract JS file to the lyout.ejs

// Setup URL Middleware - to process data sent through an HTTP request body.
const bodyParser = require('body-parser');
app.use(express.urlencoded({}));                   // Parsing form data from URL - Middleware, not for URL 

// routing all the URLs to route index file i.e App should use this file for any URL
app.use('/', require('./routes/index'));

//setup view engine
app.set('view engine' , 'ejs');
app.set('views' , './views');

// setup all Static files - Images, CSS and JS as a middleware to render
app.use (express.static('./assets'));                // Middleware to include CSS,JS, Images etc

// This code is for setting up and connecting to server
app.listen(port, function(err){
    if (err){
        console.log('Error in running the server : ', err);
    };
    console.log('Server is running on port : ' , port);
})
