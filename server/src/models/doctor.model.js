const mongoose = require("mongoose");

const Doctor = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
  },
});

module.exports = mongoose.model("doctors", Doctor);
