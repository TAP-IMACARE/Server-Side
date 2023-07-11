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

module.exports = {
  adminSignUpController,
  adminLoginController,
};
