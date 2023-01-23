var express = require("express");
var router = express.Router();
var path = require("path");
var employee = require('../../controllers/employeeController');
const Roles_List = require("../../config/roles");
const verifyRoles = require("../../middleware/verifyRoles");

router.route('/')
	.get(employee.getEmployees)
	.post(verifyRoles(Roles_List.Master, Roles_List.Editor), employee.createNewEmployee)
	.put(verifyRoles(Roles_List.Master, Roles_List.Editor), employee.updateEmployee)
	.delete(verifyRoles(Roles_List.Master), employee.deleteEmployee);

router.route('/:id')
	.get(employee.getEmployee);

module.exports = router; 