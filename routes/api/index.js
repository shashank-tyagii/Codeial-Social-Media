// This index file will route the api request to the current version of the API v1 or v2 ...

const express= require ('express');
const router = express.Router();



router.use('/v1', require('./v1'));


module.exports = router;  