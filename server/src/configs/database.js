const mongoose = require("mongoose");

const connectDB = async (mongo_uri) => {
  try {
    await mongoose.connect(mongo_uri);
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
