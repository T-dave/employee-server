const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
	username:{
		type:String,
		required:true
	},
	password:{
		type: String,
		required: true
	},
	roles:{
		User:{
			type: Number,
			default: 2013
		},
		Editor: Number,
		Master: Number
	},
	refreshToken: String
});

module.exports = mongoose.model('User', userSchema);