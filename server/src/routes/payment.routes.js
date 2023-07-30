const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth");
const paymentControllers = require("../controllers/payment.controller");

router.post(
  "/initiate",
  authMiddleware.authenticateUser,
  paymentControllers.initiatePaymentController
);

module.exports = router;
