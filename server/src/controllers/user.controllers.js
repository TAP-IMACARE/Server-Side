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

const createAppointmentController = async (req, res) => {
  try {
    const response = await userServices.createAppointmentService(
      req.body,
      req.user
    );
    res.status(response.statusCode).json(response);
  } catch (error) {
    return res.status(500).json({
      message: "Unable to create appointment",
      status: "failure",
    });
  }
};

const getUserAppointmentControllers = async (req, res) => {
  // try {
  //   const response = userServices.getUserAppointmentsService(req.user);
  //   res.status(response.statusCode).json(response);
  // } catch (error) {
  //   return res.status(500).json({
  //     message: "Unable to get appointments",
  //     status: "failure",
  //   });
  // }
  const response = await userServices.getUserAppointmentService(req.user);
  res.status(response.statusCode).json(response);
};

module.exports = {
  createUserController,
  userLoginController,
  forgotPasswordController,
  resetPasswordController,
  createAppointmentController,
  getUserAppointmentControllers,
};
