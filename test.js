const fsPromises = require('fs').promises;
const path = require('path');

const newText = "Nice to meet you";
const newText2 = "\nWhere are you from?";

const start = async()=>{
	const data = await fsPromises.readFile(path.join(__dirname, 'texts', 'hello.txt'), 'utf8');
	console.log(data);
	await fsPromises.writeFile(path.join(__dirname, 'texts', 'new.txt'), newText);
	await fsPromises.appendFile(path.join(__dirname, 'texts', 'new.txt'), newText2);
	await fsPromises.rename(path.join(__dirname, 'texts', 'new.txt'), path.join(__dirname, 'texts', 'new2.txt'),);
	const newData = await fsPromises.readFile(path.join(__dirname, 'texts', 'new2.txt'), 'utf8');
	console.log(newData);
}
start();