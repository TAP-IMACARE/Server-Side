const adminServices = require("../services/admin.services");

const adminSignUpController = async (req, res) => {
  try {
    const response = await adminServices.adminSignUpService(req.body);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(400).json({
      message: "Unable to create admin",
      status: "failure",
    });
  }
};

const adminLoginController = async (req, res) => {
  try {
    const response = await adminServices.adminLoginService(req.body);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(400).json({
      message: "unable to login at this time",
      status: "failure",
    });
  }
};

const forgotPasswordController = async (req, res) => {
  try {
    const response = await adminServices.forgotPasswordService(req.body);
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
    const response = await adminServices.resetPasswordService(req.body);
    res.status(response.statusCode).json(response);
  } catch (error) {
    return res.status(500).json({
      message: "Unable to verify",
      status: "failure",
    });
  }
};

const createDoctorController = async (req, res) => {
  try {
    const response = await adminServices.createDoctorService(req.body);
    res.status(response.statusCode).json(response);
  } catch (error) {
    return res.status(500).json({
      message: "Unable to create",
      status: "failure",
    });
  }
};

module.exports = {
  adminSignUpController,
  adminLoginController,
  forgotPasswordController,
  resetPasswordController,
  createDoctorController,
};
