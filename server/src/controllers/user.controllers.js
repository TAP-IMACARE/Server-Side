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

module.exports = {
  createUserController,
  userLoginController,
};
