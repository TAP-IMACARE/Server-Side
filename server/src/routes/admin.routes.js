const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const adminController = require("../controllers/admin.controllers");

router.post("/createadmin", adminController.adminSignUpController);
router.post("/adminlogin", adminController.adminLoginController);
router.post("/forgot-password", adminController.forgotPasswordController);
router.post("/reset-password", adminController.resetPasswordController);

module.exports = router;
