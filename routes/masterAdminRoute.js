const masterAdminController=require('../controller/masterAdminController')
const router=require('express').Router();

router
.get('/service-provider',masterAdminController.getAllServiceProvider)
.put('/activate-service-provider/:id',masterAdminController.activateServiceProvider)
.put('/deactivate-service-provider/:id',masterAdminController.deactivateServiceProvider)

module.exports=router;