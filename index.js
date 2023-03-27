const express = require('express');
const app = express();
const port = 8000;

// routing all the URLs to route index file i.e App should use this file for any URL
app.use('/', require('./routes/index'));

//setup view engine
app.set('view engine' , 'ejs');
app.set('views' , './views');

// This code is for setting up and connecting to server
app.listen(port, function(err){
    if (err){
        console.log('Error in running the server : ', err);
    };
    console.log('Server is running on port : ' , port);
})
