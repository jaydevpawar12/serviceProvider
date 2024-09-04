
const authController = require('../controller/authController')
const router = require('express').Router();

router
    .post("/register-master-admin",authController.registerMasterAdmin )
    .post("/login-master-admin",authController.loginMasterAdmin )
    .post("/logout-master-admin",authController.logoutMasterAdmin )

    .post("/register-admin", authController.registerAdmin)
    .post("/login-admin", authController.loginAdmin)
    .post("/logout-admin", authController.logoutAdmin)

    .post("/register-service-provider", authController.registerServiceProvider)
    .post("/login-service-provider", authController.loginServiceProvider)
    .post("/otp-service-provider", authController.verifyServiceProviderOtp)
    .post("/logout-service-provider", authController.logoutServiceProvider)

module.exports = router