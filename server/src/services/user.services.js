const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const responses = require("../utils/response");
const jwt = require("jsonwebtoken");

const createUserService = async (payload) => {
  const { emailAddress } = payload;

  const foundemailAddress = await User.findOne({ emailAddress: emailAddress });
  if (foundemailAddress) {
    return responses.buildFailureResponse("Email already exists", 400);
  }

  const generatedSalt = await bcrypt.genSalt(parseInt(process.env.salt_rounds));
  const hashedPassword = await bcrypt.hash(payload.password, generatedSalt);
  payload.password = hashedPassword;

  const newUser = await User.create(payload);
  return responses.buildSuccessResponse(
    "Account created successfully",
    200,
    newUser
  );
};

const userLoginService = async (payload) => {
  const { emailAddress, password } = payload;
  const foundUser = await User.findOne({ emailAddress: emailAddress }).lean();
  if (!foundUser) {
    return responses.buildFailureResponse("User does not exist", 400);
  }
  const foundPassword = await bcrypt.compare(password, foundUser.password);
  if (!foundPassword) {
    return responses.buildFailureResponse("Incorrect password", 400);
  }

  const token = jwt.sign(
    {
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
      emailAddress: foundUser.emailAddress,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );

  foundUser.accessToken = token;
  return responses.buildSuccessResponse(
    "Succesfully logged in",
    200,
    foundUser
  );
};

module.exports = {
  createUserService,
  userLoginService,
};
