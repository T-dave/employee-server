const fsPromises = require('fs').promises;
const path = require('path');
const data = {
	users: require('../data/users'),
	setUsers: function(dd){this.users = dd}
}


const handleLogout = async(req,res) =>{
		const cookies = req.cookies;
		if (!cookies?.jwt) return res.sendStatus(304);
		const refreshToken = cookies.jwt;
		const isUser = await User.findOne({refreshToken}).exec();
		if (!isUser) {
			res.clearCookie('jwt', {httpOnly:true});
			return res.sendStatus(404);
		}
		isUser.refreshToken = '';
		const result  = await isUser.save();
		console.log(result);
		res.clearCookie('jwt', {httpOnly:true});
		res.sendStatus(204);
}



module.exports = {handleLogout};