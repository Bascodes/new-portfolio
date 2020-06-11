const express = require("express");
const bodyParser = require("body-parser");
const nodeMailer = require("nodemailer");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/dist/index.html");
});

app.get("/about", (req, res) => {
  res.sendFile(__dirname + "/dist/about.html");
});

app.get("/work", (req, res) => {
  res.sendFile(__dirname + "/dist/work.html");
});

app.get("/contact", (req, res) => {
  res.sendFile(__dirname + "/dist/contact.html");
});

app.post("/contact", (req, res) => {
  const output = `<p>You have a new contact request</p>
  <h3>Contact Details</h3>
  <ul>  
    <li>Name: ${req.body.name}</li>
    <li>Email: ${req.body.email}</li>
    <li>Subject: ${req.body.subject}</li>
  </ul>
  <h3>Message</h3>
  <p>${req.body.message}</p>
`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "chiefspammer@yourgreatdomain.com",
      pass: "SuperSecretPassword", // naturally, replace both with your real credentials or an application-specific password
    },
  });

  const mailOptions = {
    from: "vindication@enron.com",
    to: "friendsofenron@gmail.com",
    subject: "Invoices due",
    text: "Dudes, we really need your money.",
    html: output,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
});

app.listen(3000, () => {
  console.log("server started successfully!");
});
