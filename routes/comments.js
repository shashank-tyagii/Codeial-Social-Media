const express = require('express');
const router = express.Router();
const passport = require('passport');

const commentsController = require('../controllers/comments_controller');

// Dual auth - One on HTML page and other on Router
router.post('/create', passport.checkAuthentication, commentsController.create);


module.exports = router;