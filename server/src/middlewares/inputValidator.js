const Joi = require("joi");

const adminSignUpValidator = async (req, res, next) => {
  const schema = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    role: Joi.string().required(),
    userId: Joi.string().required(),
    emailAddress: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  try {
    await schema.validateAsync(req.body);
    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ status: "error", message: error.details[0].message });
  }
};

const userSignUpValidator = async (req, res, next) => {
  const schema = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    emailAddress: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  try {
    await schema.validateAsync(req.body);
    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ status: "error", message: error.details[0].message });
  }
};

const adminLoginValidator = async (req, res, next) => {
  const schema = Joi.object().keys({
    userId: Joi.string().required(),
    password: Joi.string(),
  });
  try {
    await schema.validateAsync(req.body);
    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ status: "error", message: error.details[0].message });
  }
};

const userLoginValidator = async (req, res, next) => {
  const schema = Joi.object().keys({
    contactEmail: Joi.string().email().required(),
    password: Joi.string(),
  });
  try {
    await schema.validateAsync(req.body);
    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ status: "error", message: error.details[0].message });
  }
};

module.exports = {
  adminSignUpValidator,
  userSignUpValidator,
  adminLoginValidator,
  userLoginValidator,
};
