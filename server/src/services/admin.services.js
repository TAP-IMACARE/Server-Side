const Admin = require("../models/admin.model");
const responses = require("../utils/response");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminSignUpService = async (payload) => {
  const { userId, emailAddress } = payload;

  const founduserId = await Admin.findOne({ userId: userId });
  if (founduserId) {
    return responses.buildFailureResponse("UserId already exists", 400);
  }

  const foundEmailAddress = await Admin.findOne({ emailAddress: emailAddress });
  if (foundEmailAddress) {
    return responses.buildFailureResponse("Email Address already exists", 400);
  }

  const generatedSalt = await bcrypt.genSalt(parseInt(process.env.salt_rounds));
  const hashedPassword = await bcrypt.hash(payload.password, generatedSalt);
  payload.password = hashedPassword;

  const newAdmin = await Admin.create(payload);

  return responses.buildSuccessResponse(
    "Account created succesfully",
    200,
    newAdmin
  );
};

const adminLoginService = async (payload) => {
  const { userId, password } = payload;

  const foundadmin = await Admin.findOne({ userId: userId }).lean();
  if (!foundadmin) {
    return responses.buildFailureResponse("Admin not found", 400);
  }

  const passwordMatch = await bcrypt.compare(password, foundadmin.password);
  if (!passwordMatch) {
    return responses.buildFailureResponse("Incorrect password", 400);
  }

  const token = jwt.sign(
    {
      firstName: foundadmin.firstName,
      lastName: foundadmin.lastName,
      emailAddress: foundadmin.emailAddress,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
  foundadmin.accessToken = token;

  return responses.buildSuccessResponse(
    "Logged in successfully",
    200,
    foundadmin
  );
};

module.exports = {
  adminSignUpService,
  adminLoginService,
};
