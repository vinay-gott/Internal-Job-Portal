const express=require('express')
const app = express();
app.use(express.json());
const EmployeeRoutes=express.Router()
EmployeeRoutes.use(express.json())
// const EmployeeModel=require('../models/EmployeeModel.model')
const emp=require('../controllers/EmployeeController.controller')
EmployeeRoutes.get('/',emp.getEmployee)
EmployeeRoutes.get('/:id',emp.getEmployeeById)
EmployeeRoutes.put('/',emp.editEmployee)
EmployeeRoutes.post('/',emp.saveEmployee)
EmployeeRoutes.delete('/:id',emp.deleteEmployee)