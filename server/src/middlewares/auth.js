const jwt = require("jsonwebtoken");
const Admin = require("../models/user.model");

const authenticate = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(400).json({
        message: "Authorization must start with bearer",
        status: "failure",
      });
    }
    const token = authorization.substring(7);
    const decodedUser = jwt.decode(token);
    const foundAdmin = await Admin.findOne({ _id: decodedUser._id });
    req.user = foundAdmin;
    next();
  } catch (error) {
    return res
      .status(error?.statusCode || 500)
      .send(error?.message || "unable to authenticate");
  }
};

module.exports = {
  authenticate,
};
