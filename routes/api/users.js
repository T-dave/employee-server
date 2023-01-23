var express = require("express");
var router = express.Router();
var path = require("path");
var {createUser, authUser} = require('../../controllers/registerController');


router.route('/register').post(createUser);
router.route('/logIn').post(authUser);


module.exports = router;