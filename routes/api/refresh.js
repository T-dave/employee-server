var express = require("express");
var router = express.Router();
var path = require("path");
var refreshToken = require('../../controllers/refreshController');


router.route('/').get(refreshToken);

module.exports = router;