const User = require('../data/userSchema');
const bcrypt = require('bcrypt');
const logEvent = require('../middleware/logEvent');
const jwt = require('jsonwebtoken');


const createUser = async(req,res) =>{
		const user = req.body.username;
		const pwd = req.body.password;
		if (!user || !pwd) return res.status(400).json({"message":`Username and passwword are required`});
		const isUser = await User.findOne({username: req.body.username}).exec();
		if (isUser) return res.status(400).json({"message":`UserName ${req.body.username ? req.body.username :""} already exists`});
			
			try{
					const hashedPwd = await bcrypt.hash(req.body.password, 10);
					const newUser = await User.create({
					username: req.body.username,
					roles:{
						"Editor": 2004
					},
					password: hashedPwd
				})
					res.status(201).json({'success':`New user ${req.body.username} has been created`});
					console.log(newUser);
				}catch(err){
					res.status(500).json({'message': err.message});
					logEvent(`${err.type}\t${err.name}`, `ErrorLog.txt`);
				}
				
		}


const authUser = async(req,res) =>{
		const user = req.body.username;
		const pwd = req.body.password;
		if (!user || !pwd) return res.status(400).json({"message":`Username and passwword are required`});
		const isUser = await User.findOne({username: req.body.username}).exec();

		if (!isUser) return res.status(400).json({"message":`UserName ${req.body.username ? req.body.username :""} dosen't exist`});
		const match = await bcrypt.compare(req.body.password.toString(), isUser.password.toString());
		if (match) {
			const  roles = Object.values(isUser.roles);
			try{
				const accessToken = jwt.sign(
					{
						"UserInfo":{
								"username": isUser.username,
								"roles": roles
							}
					},
					process.env.ACCESS_TOKEN_SECRET,
					{expiresIn: '300s'}
				);
				const refreshToken = jwt.sign(
					{"username": isUser.username},
					process.env.REFRESH_TOKEN_SECRET,
					{expiresIn: '1d'}
					);
				isUser.refreshToken = refreshToken;
				const result = await isUser.save();
				console.log(result);
				res.cookie('jwt', refreshToken, {httpOnly:true, secure:true, maxAge:24*60*60*1000});
				res.json({accessToken});
				}catch(err){
					logEvent(`${err.type}\t${err.name}`, `ErrorLog.txt`);
				}
		}else{
			res.status(400).json({"message":`Incorrect password`});
		}
			
}



module.exports = {createUser, authUser};
