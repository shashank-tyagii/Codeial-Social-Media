const express= require ('express');
const router = express.Router();

router.use('/posts', require('./posts'));  // direct to posts.js file 


module.exports = router;  