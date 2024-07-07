// utils/mailer.js
const nodemailer = require('nodemailer');

require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: process.env.AUTH_USER,
        pass: process.env.AUTH_SECRET,
    }
});

transporter.verify(function(error, success) {
    if (error) {
          console.log('Connection error:', error);
    } else {
          console.log('Server is ready to take our messages');
    }
  });

const sendMail = (to, subject, text, callback) => {
    const mailOptions = {
      from: process.env.AUTH_MAIL, // Remitente
      to,                          // Destinatario
      subject,                     // Asunto del correo
      text,                        // Texto del correo
    };
  
    transporter.sendMail(mailOptions, (error, response) => {
      if (error) {
        console.log(error);
      } else {
        console.log(response);
      }
      transporter.close();
      if (callback) {
        callback(error, response);
      }
    });
  };

module.exports = { sendMail };