// This file will be used to set all routes on the URL to the respective locations www.example.com/

const express= require ('express');
const router = express.Router();
const passport = require('passport');
const homeController = require('../controllers/home_controller');

router.get('/' , passport.checkAuthentication , homeController.home);

// This function will be used to route users route to users.js as all routes will come to index.js first and from here everything will be redirected
router.use('/users', require('./users'));

router.use('/posts', require('./posts'));

router.use('/comments', require('./comments'));

// For API requests, direct to API index file

router.use('/api', require('./api'));

// Exporting this to be available/use at main index.js file 
module.exports = router;  