// const nodemailer = require("nodemailer");
// const nodeMailMailGun = require("nodemailer-mailgun-transport");
require("dotenv").config();
const mailgun = require("mailgun-js");

const sendEmail = (options) => {
  const mg = mailgun({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  });
  const data = {
    from: process.env.EMAIL_FROM,
    to: options.to,
    subject: options.subject,
    text: options.text,
  };
  mg.messages().send(data, function (error, body) {
    console.log(body);
    if (error) console.log(error);
  });
};

// Implementation for SendGrid Api
// const sendEmail = (options) => {
//   const transporter = nodemailer.createTransport({
//     service: process.env.EMAIL_SERVICE,
//     auth: {
//       user: process.env.EMAIL_USERNAME,
//       pass: process.env.EMAIL_PASSWORD,
//     },
//   });

module.exports = sendEmail;
