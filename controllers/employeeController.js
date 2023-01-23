const Employee = require('../data/employeeSchema');



const getEmployees = async (req,res) =>{
		const employees = await Employee.find({});
		if(!employees) return res.status(204).json({'message': 'No Employee found'});
		res.json(employees);
}

const createNewEmployee = async (req,res) =>{
		if(!req.body.firstname || !req.body.lastname){
			return res.status(400).json({"message":"First and last names are required"});
		}
		try{const newEmployee = await Employee.create({
			firstname:req.body.firstname,
			lastname:req.body.lastname,
			});
		return res.status(201).json(newEmployee);
	}catch(err){
			console.error(err);
		}
}

const updateEmployee = async(req,res) =>{
		if(!req.body.id) return res.status(400).json({"message":"ID is required"});
		const newUpdate = await Employee.findOne({_id:req.body.id}).exec();
		if (!newUpdate) {
			res.status(400).json({"message":`Employee id ${req.body.id ? req.body.id : ""} not found`});
		}
		if (req.body.firstname) newUpdate.firstname = req.body.firstname;
		if (req.body.lastname) newUpdate.lastname = req.body.lastname;
		const result = await newUpdate.save();
		res.json(result);
}


const deleteEmployee = async (req,res) =>{
		if(!req.body.id) return res.status(400).json({"message":"ID is required"});
		const newDelete = await Employee.findOne({_id:req.body.id}).exec();
		if (!newDelete){
			res.status(400).json({"message":`Employee id ${req.body.id ? req.body.id :""} not found`});
		}
		const result = await newDelete.deleteOne({_id:req.body.id});
		res.json(result);
		
}

const getEmployee = async (req,res) =>{
		if(!req.body.id){
				return res.status(400).json({"message":"ID is required"});
			}
		const employee = await Employee.findOne({_id:req.body.id}).exec();
		if (!employee){
			res.status(400).json({"message":`Employee id ${req.params.id ? req.params.id :""} not found`});
		}
		res.json(employee);
}

module.exports = {
	getEmployees,
	createNewEmployee,
	updateEmployee,
	deleteEmployee,
	getEmployee
}
