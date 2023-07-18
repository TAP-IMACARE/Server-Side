const userServices = require("../services/user.services");

const createUserController = async (req, res) => {
  try {
    const response = await userServices.createUserService(req.body);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(400).json({
      message: "Unable to create user",
      status: "failure",
    });
  }
};

const userLoginController = async (req, res) => {
  try {
    const response = await userServices.userLoginService(req.body);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(400).json({
      message: "Unable to login",
      status: "failure",
    });
  }
};

const forgotPasswordController = async (req, res) => {
  try {
    const response = await userServices.forgotPasswordService(req.body);
    res.status(response.statusCode).json(response);
  } catch (error) {
    return res.status(500).json({
      message: "Unable to send OTP",
      status: "failure",
    });
  }
};

const resetPasswordController = async (req, res) => {
  try {
    const response = await userServices.resetPasswordService(req.body);
    res.status(response.statusCode).json(response);
  } catch (error) {
    return res.status(500).json({
      message: "Unable to verify",
      status: "failure",
    });
  }
};

module.exports = {
  createUserController,
  userLoginController,
  forgotPasswordController,
  resetPasswordController,
};
