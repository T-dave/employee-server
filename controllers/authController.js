 const bcrypt = require('bcrypt');
const logEvent = require('../middleware/logEvent');
const fsPromises = require('fs').promises;
const jwt = require('jwt');
const cookie = require('cookie-parser');
const data = {
	users: require('../data/users'),
	setUsers: function(dd){this.users = dd}
}


const authUser = async(req,res) =>{
		if (!req.body.username) {
			res.status(400).json({"message":`Please inpute a username`});
		}else if(!req.body.password){
			res.status(400).json({"message":`Please inpute a password`});
		}
		const isUser = data.users.find(obj=>req.body.username === obj.username);

		if (!isUser) {
			return(
				res.status(400).json({"message":`UserName ${req.body.username ? req.body.username :""} dosen't exist`})
				); 
		}else{
			 console.log(isUser);
		}
		const match = await bcrypt.compare(req.body.password, isUser.password);
		if (match) {
			try{
				const accessToken = jwt.sign(
					{"username": isUser.username},
					process.env.ACCESS_TOKEN_SECRET,
					{expiresIn: '30s'}
				);
				const refreshToken = jwt.sign(
					{username: isUser.username},
					process.env.ACCESS_TOKEN_SECRET,
					{expiresIn: '1d'}
					);
				const otherUsers = data.users.find(obj=>isUser.username !== obj.username);
				const presentUser = {...isUser, refreshToken};
				data.setUsers([...otherUsers, presentUser]);
				res.cookie('jwt', refreshToken, {httpOnly:true, maxAge:24*60*60*1000});
				res.json({accessToken});
				}catch(err){
					logEvent(`${err.type}\t${err.name}`, `ErrorLog.txt`);
				}
		}else{
			res.status(400).json({"message":`Incorrect password`});
		}
			
}

module.exports = {authUser};