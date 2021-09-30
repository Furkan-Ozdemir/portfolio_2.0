const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
require("dotenv").config();

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("index.html");
});

app.post("/mail", function (req, res) {
  const email = req.body.email;
  const name = req.body.name;
  const subject = req.body.subject;
  const message = req.body.message;
  console.log(email, name, subject, message);
  async function main(email) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: "Yahoo",
      auth: {
        user: "assign.it@yahoo.com",
        pass: process.env.PASSWORD,
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: "assign.it@yahoo.com", // sender address
      to: "ozthefur@gmail.com", // list of receivers
      subject: "biri mesaj attı", // Subject line
      text: `name:${name},email:${email},subject:${subject}, message:${message}`, // plain text body
      html: `<b>name:${name} <br>,email:${email}<br>,subject:${subject}<br>, message:${message} </b>`, // html body
    });
  }
  main(email).catch(console.error);
  res.redirect("/");
});

app.listen(port, () => {
  console.log("port started at " + port);
});
