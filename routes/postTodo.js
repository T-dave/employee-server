var express = require("express");
var router = express.Router();

router.get("/", function(req,res,next){
	res.send("send todo");
});

module.exports = router;