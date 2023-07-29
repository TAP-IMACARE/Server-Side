const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user.controllers");
const authMiddleware = require("../middlewares/auth");

router.post("/createaccount", userControllers.createUserController);
router.post("/userlogin", userControllers.userLoginController);
router.post("/forgot-password", userControllers.forgotPasswordController);
router.post("/reset-password", userControllers.resetPasswordController);
router.post(
  "/create-appointment",
  authMiddleware.authenticate,
  userControllers.createAppointmentController
);

module.exports = router;
