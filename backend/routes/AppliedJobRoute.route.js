const express=require('express')

const AppliedJobRoutes=express.Router()

const AppliedRouter=require('../controllers/AppliedJobController.controller')

AppliedJobRoutes.get('/:id',AppliedRouter.showJobs)
AppliedJobRoutes.post('/home/:id',AppliedRouter.jobMapping)
AppliedJobRoutes.delete('/delete',AppliedRouter.deleteMapping)

module.exports=AppliedJobRoutes
