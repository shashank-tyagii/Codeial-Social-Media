// This file will be used to set all routes on the URL to the respective locations

const express= require ('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');

router.get('/' , homeController.home);

// Exporting this to be available/use at main index.js file 
module.exports = router;  