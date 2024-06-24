const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
admin.initializeApp();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your-email@gmail.com",
    pass: "your-email-password",
  },
});

exports.sendVoterIdEmail = functions.https.onRequest((req, res) => {
  const {email, voterId} = req.body;

  const mailOptions = {
    from: "your-email@gmail.com",
    to: email,
    subject: "Your Voter ID",
    text: `Your Voter ID is ${voterId}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    return res.status(200).send("Email sent: " + info.response);
  });
});
