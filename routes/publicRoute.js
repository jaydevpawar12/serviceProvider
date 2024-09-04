
const publicController=require('../controller/serviceProviderController')
const router=require('express').Router();

router
.get('/service-provider',publicController.getAllServiceProvider)


module.exports=router;
