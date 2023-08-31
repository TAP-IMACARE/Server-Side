const Admin = require("../models/admin.model");
const bcrypt = require("bcrypt");

const seedAdmin = async () => {
  const foundAdmin = await Admin.find({ role: "superadmin" });
  if (foundAdmin.length < 1) {
    const data = {
      firstName: "Main",
      lastName: "Admin",
      role: "superadmin",
      password: "testing",
      userId: "admin001",
    };

    const genSalt = await bcrypt.genSalt(Number(process.env.salt_rounds));
    const hashedPassword = await bcrypt.hash(data.password, genSalt);
    data.password = hashedPassword;

    const createAdmin = await Admin.create(data);
    if (!createAdmin) {
      console.log("Unable to seed Admin");
      return;
    }
    console.log("Admin seeding succesful");
  }
  return;
};

module.exports = seedAdmin;
