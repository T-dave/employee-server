require('dotenv').config();
var express = require("express");
var path = require("path");
var verifyJwt = require('./middleware/verifyJwt');
var logEvent = require('./middleware/logEvent');
var app = express();
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
port = process.env.PORT || 3000;


connectDB();

//form validation with express(middleware)
app.use(express.urlencoded({encoded:false}));

//use json files with express(middleware)
app.use(express.json());

//use static files with express(middleware)
app.use('/', express.static(path.join(__dirname, 'public')));

//use custom middleware
app.use((req, res, next)=>{
	logEvent(`${req.method}\t${req.header.origin}\t${req.url}`, `EventLog.txt`);
	next();
});

app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/api/users.js'));
app.use('/refresh', require('./routes/api/refresh.js'));
app.use('/logout', require('./routes/api/logout.js'));

app.use(verifyJwt);
app.use('/employees', require('./routes/api/employees.js'));


mongoose.connection.once('open', ()=>{
	console.log('connected to MongoDB');
	//start the port with express
	app.listen(port, function(){
		console.log("App running on port", port);
	});
})

 