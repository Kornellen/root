const nodemailer = require("nodemailer");
const handleBars = require("handlebars");
const emailConfig = require("../config/email");
var colors = require("colors");
const fs = require("fs");

colors.enable();

const sendMail = (to) => {
  fs.readFile("templates/mail.html", "utf8", (err, emailTempl) => {
    if (err) {
      console.log(
        `[EMAIL]: `.red + `Failed to read email template: ${err}`.red
      );
    } else {
      const template = handleBars.compile(emailTempl);

      const authLink = `http://localhost:5175/api/verify?email=${to}`;

      const emailTemplHTML = template({ authLink });

      let transporter = nodemailer.createTransport(emailConfig);

      let mailOptions = {
        from: emailConfig.auth.user,
        to: to,
        subject: "Registry",
        html: emailTemplHTML,
      };

      transporter.sendMail(mailOptions, (err, info) => {
        err
          ? console.log(`[EMAIL]: `.red + ` ${err}`.red)
          : console.log(`[EMAIL]: `.blue + `Sended ${info.response}`.green);
      });
    }
  });
};

module.exports = { sendMail };
