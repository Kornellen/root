const dotenv = require("dotenv");

dotenv.config();

const user = process.env.EMAIL_ADDRESS;
const pass = process.env.APP_PASSWORD;

const emailConfig = {
  service: "gmail",
  auth: {
    user: user,
    pass: pass,
  },
};

module.exports = emailConfig;
