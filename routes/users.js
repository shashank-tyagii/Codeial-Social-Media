// www.example.com/users/route , directed from routes/index.js file

const express= require ('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');

router.get('/profile' , usersController.profile);
router.get('/sign-in',  usersController.signIn );
router.get('/sign-up',  usersController.signUp);
router.post('/create', usersController.create);
router.post('/create_session', usersController.createSession);
router.post('/sign-out', usersController.deleteSession);

// Exporting this to be available/use at main index.js file 
module.exports = router; 