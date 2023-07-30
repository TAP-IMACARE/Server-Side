const paymentServices = require("../services/payment.services");

const initiatePaymentController = async (req, res) => {
  try {
    const response = await paymentServices.initiatePaymentService(
      req.body,
      req.user
    );
    res.status(response.statusCode).json(response);
  } catch (error) {
    return res.status(500).json({
      message: "Unable to intiate payment",
      status: "failure",
    });
  }
};

module.exports = {
  initiatePaymentController,
};
