const express = require("express");
const userControllers = require("../controllers/user.controllers");
const router = express.Router();

router.post("/createaccount", userControllers.createUserController);
router.post("/userlogin", userControllers.userLoginController);
router.post("/forgot-password", userControllers.forgotPasswordController);
router.post("/verify-OTP", userControllers.verifyOTPController);

module.exports = router;
