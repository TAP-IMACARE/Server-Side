const mongoose = require("mongoose");

const Admin = mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    role: {
      type: String,
    },
    userId: {
      type: String,
      unique: true,
    },
    emailAddress: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    resetPin: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("admin", Admin);
