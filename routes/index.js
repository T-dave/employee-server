var express = require("express");
var router = express.Router();
var path = require("path");
var index = path.join(__dirname, '..', 'views', 'index.html');

//render a file with express
router.get("/", (req, res)=>{
	res.sendFile(index);
});
router.get("/todo", (req, res)=>{
	res.send("Hello world");
}); 

module.exports = router;