const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const inputValidator = require("../middlewares/inputValidator");
const adminController = require("../controllers/admin.controllers");

router.post(
  "/createadmin",
  inputValidator.adminSignUpValidator,
  adminController.adminSignUpController
);
router.post(
  "/adminlogin",
  inputValidator.adminLoginValidator,
  adminController.adminLoginController
);
router.post("/forgot-password", adminController.forgotPasswordController);
router.post("/reset-password", adminController.resetPasswordController);
router.post("/create-doctor", adminController.createDoctorController);

module.exports = router;
