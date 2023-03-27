// www.example.com/users/route , directed from routes/index.js file

const express= require ('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');

router.get('/profile' , usersController.profile);


// Exporting this to be available/use at main index.js file 
module.exports = router; 