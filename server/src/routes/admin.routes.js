const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth");
const adminController = require("../controllers/admin.controllers");

router.post(
  "/createadmin",
  authMiddleware.authenticate,
  adminController.adminSignUpController
);
router.post("/adminlogin", adminController.adminLoginController);

module.exports = router;
