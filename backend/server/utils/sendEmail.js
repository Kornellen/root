const nodemailer = require("nodemailer");
const emailConfig = require("../config/email");

const sendMail = (to) => {
  let transporter = nodemailer.createTransport(emailConfig);

  let mailOptions = {
    from: emailConfig.auth.user,
    to: to,
    subject: "Registry",
    text: "Welcome to our page",
  };

  transporter.sendMail(mailOptions, (err, info) => {
    err
      ? console.log(`[EMAIL]: ${err}`)
      : console.log(`[EMAIL]: Sended ${info.response}`);
  });
};

module.exports = { sendMail };
