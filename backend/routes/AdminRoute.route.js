const express=require('express')
const AdminRoutes=express.Router()
//const EmployeeModel=require('../models/EmployeeModel.model')
const emp=require('../controllers/AdminController.controller')
const e=require('../controllers/EmployeeController.controller');
const auth = require('../middleware/auth.middleware');
const isAdmin = require('../middleware/isAdmin.middleware');

AdminRoutes.use(auth)
AdminRoutes.use(isAdmin)

AdminRoutes.get('/',e.getEmployee)
AdminRoutes.get('/hr',emp.getAllHR)
AdminRoutes.put('/update/:id',emp.updateHR)
AdminRoutes.post('/add',emp.addHR)
AdminRoutes.delete('/delete/:id',emp.deleteHR)
AdminRoutes.get('/details',emp.getEmpHR)

module.exports=AdminRoutes