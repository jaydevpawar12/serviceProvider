
const serviceProviderController = require('../controller/serviceProviderController')
const router = require('express').Router();

router
    .get("/service-provider", serviceProviderController.getAllServiceProvider)
    .put("/update-service-provider/:id", serviceProviderController.updateProfile)
    .delete("/deleted-service-provider/:id", serviceProviderController.deleteServiceProvider)

module.exports = router