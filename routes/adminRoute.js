const adminController = require("../controller/adminController")
const router = require('express').Router();

router

    .get("/category", adminController.getAllCategory)
    .post("/add-category", adminController.addCategory)
    .put("/update-category/:id", adminController.updateCategory)
    .delete("/delete-category/:id", adminController.deleteCategory)
    .put("/activate-category/:id", adminController.activateCategory)
    .put("/deactivate-category/:id", adminController.deactivateCategory)

    .get("/job-profile", adminController.getJobProfile)
    .post("/add-job-profile", adminController.addJobProfile)
    .put("/update-job-profile/:id", adminController.updateJobProfile)
    .delete("/delete-job-profile/:id", adminController.deleteJobProfile)
    .put("/activate-job-profile/:id", adminController.activateJobProfile)
    .put("/deactivate-job-profile/:id", adminController.deactivateJobProfile)

    .get("/service-provider", adminController.getAllServiceProvider)
    .put("/activate-service-provider/:id", adminController.activateServiceProvider)
    .put("/deactivate-service-provider/:id", adminController.deactivateServiceProvider)


module.exports = router

