// www.example.com/users/route , directed from routes/index.js file

const express= require ('express');
const router = express.Router();
const passport = require('passport');
const usersController = require('../controllers/users_controller');


router.get('/profile/:id' ,passport.checkAuthentication, usersController.profile);
router.post('/update/:id', passport.checkAuthentication, usersController.update);

router.get('/sign-in',  usersController.signIn );
router.get('/sign-up',  usersController.signUp);
router.post('/create', usersController.create);
router.get('/sign-out',  usersController.deleteSession);

// Use middleware passportJS to auth
router.post('/create_session', passport.authenticate(
    'local',
    {failureRedirect : '/users/sign-in'},
), usersController.createSession);

// Exporting this to be available/use at main index.js file 
module.exports = router; 