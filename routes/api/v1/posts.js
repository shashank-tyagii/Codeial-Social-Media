const express= require ('express');
const router = express.Router();
const passport = require('passport');

const postApi = require ("../../../controllers/api/v1/posts_api");


router.get('/', postApi.index);
router.delete('/:id', passport.authenticate('jwt', {session : false,}) , postApi.destroy);  // Session- false to not create new session ID 


module.exports = router; 