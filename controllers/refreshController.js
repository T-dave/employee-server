const bcrypt = require('bcrypt');
const logEvent = require('../middleware/logEvent');
const fsPromises = require('fs').promises;
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');
const data = {
	users: require('../data/users'),
	setUsers: function(dd){this.users = dd}
}


const refreshToken = async(req,res) =>{
		const cookies = req.cookies
		if (!cookies?.jwt) return res.sendStatus(401);
		const refreshToken = cookies.jwt;
		const isUser =  await User.findOne({refreshToken}).exec();
		if (!isUser) return res.sendStatus(403);
		jwt.verify(
			refreshToken,
			process.env.REFRESH_TOKEN_SECRET,
			(err, decoded) =>{
				if(err) return res.sendStatus(403);
				const  roles = Object.values(isUser.roles);

				const accessToken = jwt.sign(
					{
						"UserInfo":{
								"username": isUser.username,
								"roles": roles
							}
					},
					process.env.ACCESS_TOKEN_SECRET,
					{expiresIn: '30s'}
				);
				console.log({accessToken});
			}
			);
}



module.exports = refreshToken;