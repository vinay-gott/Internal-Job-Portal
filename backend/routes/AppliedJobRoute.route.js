const express=require('express')
const AppliedJobRoutes=express.Router()
AppliedJobRoutes.use(express.json())
const AppliedRouter=require('../controllers/AppliedJobController.controller')

AppliedJobRoutes.get('/',AppliedRouter.showJobs)

