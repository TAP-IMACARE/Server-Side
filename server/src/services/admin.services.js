const responses = require("../utils/response");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin.model");
const Doctor = require("../models/doctor.model");
const generateResetPin = require("../utils/generateResetPin");
const sendMail = require("../utils/resetPasswordMail");

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

const forgotPasswordService = async (payload) => {
  const { emailAddress } = payload;
  const foundAdmin = await Admin.findOne({ emailAddress: emailAddress });
  if (!emailAddress) {
    return responses.buildFailureResponse("Admin does not exist", 400);
  }
  const resetPin = generateResetPin();
  const updatedAdmin = await Admin.findByIdAndUpdate(
    { _id: foundAdmin._id },
    { resetPin: resetPin },
    { new: true }
  );

  const forgotPasswordPayload = {
    to: updatedAdmin.emailAddress,
    subject: "RESET PASSWORD",
    pin: resetPin,
  };
  await sendMail.sendPasswordResetMail(forgotPasswordPayload);
  return responses.buildSuccessResponse(
    "OTP sent successfully",
    200,
    updatedAdmin
  );
};

const resetPasswordService = async (payload) => {
  const { emailAddress, resetPin } = payload;

  const foundAdmin = await Admin.findOne(
    { emailAddress: emailAddress },
    { resetPin: resetPin }
  );
  if (!foundAdmin) {
    return responses.buildFailureResponse("Admin not found", 400);
  }
  const generatedSalt = await bcrypt.genSalt(parseInt(process.env.salt_rounds));
  const hashedPassword = await bcrypt.hash(payload.password, generatedSalt);

  const updatedAdmin = await Admin.findByIdAndUpdate(
    { _id: foundAdmin._id },
    { password: hashedPassword, resetPin: null },
    { new: true }
  );

  return responses.buildSuccessResponse(
    "Password Reset Successful",
    200,
    updatedAdmin
  );
};

const createDoctorService = async (payload) => {
  const {
    firstName,
    lastName,
    specialization,
    phoneNumber,
    emailAddress,
    gender,
  } = payload;

  const foundNumber = await Doctor.findOne({ phoneNumber: phoneNumber });
  if (foundNumber) {
    return responses.buildFailureResponse("Phone Number already exists", 400);
  }
  const foundEmail = await Doctor.findOne({ emailAddress: emailAddress });
  if (foundEmail) {
    return responses.buildFailureResponse("Email Address already exists", 400);
  }

  const newDoctor = await Doctor.create(payload);
  return responses.buildSuccessResponse(
    "Doctor created succesfully",
    200,
    newDoctor
  );
};

module.exports = {
  adminSignUpService,
  adminLoginService,
  forgotPasswordService,
  resetPasswordService,
  createDoctorService,
};
