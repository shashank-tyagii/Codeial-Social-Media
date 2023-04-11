const express= require ('express');
const router = express.Router();

router.use('/posts', require('./posts'));  // direct to posts.js file 
router.use('/users', require('./users'));  // direct to posts.js file 

module.exports = router;  