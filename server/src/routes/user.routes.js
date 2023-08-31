const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user.controllers");
const authMiddleware = require("../middlewares/auth");
const inputValidator = require("../middlewares/inputValidator");

router.post(
  "/createaccount",
  inputValidator.adminSignUpValidator,
  userControllers.createUserController
);
router.post(
  "/userlogin",
  inputValidator.userLoginValidator,
  userControllers.userLoginController
);
router.post("/forgot-password", userControllers.forgotPasswordController);
router.post("/reset-password", userControllers.resetPasswordController);
router.post(
  "/create-appointment",
  authMiddleware.authenticateUser,
  userControllers.createAppointmentController
);

router.get(
  "/allappointments",
  authMiddleware.authenticateUser,
  userControllers.getUserAppointmentControllers
);

module.exports = router;
