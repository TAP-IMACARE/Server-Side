const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Appointment = require("../models/appointment.model");
const Doctor = require("../models/doctor.model");
const responses = require("../utils/response");
const sendMail = require("../utils/resetPasswordMail");
const generateResetPin = require("../utils/generateResetPin");

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

const forgotPasswordService = async (payload) => {
  const { emailAddress } = payload;

  const foundUser = await User.findOne({ emailAddress: emailAddress });
  if (!foundUser) {
    return responses.buildFailureResponse("User does not exist", 400);
  }
  const resetPin = generateResetPin();
  const updatedUser = await User.findByIdAndUpdate(
    { _id: foundUser._id },
    { resetPin: resetPin },
    { new: true }
  );

  const forgotPasswordPayload = {
    to: updatedUser.emailAddress,
    subject: "RESET PASSWORD",
    pin: resetPin,
  };

  await sendMail.sendPasswordResetMail(forgotPasswordPayload);
  return responses.buildSuccessResponse(
    "OTP sent Succesfully",
    200,
    updatedUser
  );
};

const resetPasswordService = async (payload) => {
  const { emailAddress, resetPin } = payload;

  const foundUser = await User.findOne(
    { emailAddress: emailAddress },
    { resetPin: resetPin }
  );
  if (!foundUser) {
    return responses.buildFailureResponse("User not found", 400);
  }
  const generatedSalt = await bcrypt.genSalt(parseInt(process.env.salt_rounds));
  const hashedPassword = await bcrypt.hash(payload.password, generatedSalt);

  const updatedUser = await User.findByIdAndUpdate(
    { _id: foundUser._id },
    { password: hashedPassword, resetPin: null },
    { new: true }
  );

  return responses.buildSuccessResponse(
    "Password Reset Successful",
    200,
    updatedUser
  );
};

const createAppointmentService = async (payload) => {
  const { firstName, lastName, specialization, time, date, author } = payload;
  const appointmentExists = await Appointment.findOne(
    { firstName: firstName },
    { lastName: lastName },
    { specialization: specialization },
    { time: time },
    { date: date }
  );

  if (appointmentExists) {
    return responses.buildFailureResponse(
      "The doctor will not be available at this time",
      400
    );
  }
  const newAppointment = await Appointment.create(payload);
  return responses.buildSuccessResponse(
    "Appointment succesfully created",
    200,
    newAppointment
  );
};

module.exports = {
  createUserService,
  userLoginService,
  forgotPasswordService,
  resetPasswordService,
  createAppointmentService,
};
