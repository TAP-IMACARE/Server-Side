const axios = require("axios");
const Transaction = require("../models/transaction.model");
const responses = require("../utils/response");
const reference = require("../utils/generatePaymentReference");

const initiatePaymentService = async (payload, user) => {
  try {
    const { amount } = payload;
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    };
    const body = {
      email: user.emailAddress,
      amount: Number(amount * 100),
      reference: reference(),
    };
    const response = await axios.post(process.env.PAYSTACK_URL, body, options);
    const paymentLink = response.data;
    await Transaction.create(body);
    return responses.buildSuccessResponse(
      "Payment link generated",
      200,
      paymentLink
    );
  } catch (error) {
    return responses.buildFailureResponse(error?.message, error?.statusCode);
  }
};

module.exports = {
  initiatePaymentService,
};
