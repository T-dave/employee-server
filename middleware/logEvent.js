var path = require("path");
var fs = require("fs");
var fsPromises = require("fs").promises;


const logEvent = async(msg, name)=>{
	try{
		if(!fs.existsSync(path.join(__dirname, '..', 'log'))){
			await fsPromises.mkdir(path.join(__dirname, '..', 'log'));
		}
		await fsPromises.appendFile(path.join(__dirname, '..', 'log', name), `${msg}\n`);

	}catch(err){
		console.error(err);
	}
}

module.exports = logEvent;