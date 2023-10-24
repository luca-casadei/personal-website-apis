//Express constants
const express = require("express");
const listener = express();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

//CORS
const cors = require("cors");
listener.use(cors);

//Configuration and mailer constants
const config = require("../config/config");
const mailSend = require("./mail/mailhandler");

listener.post("/send", jsonParser, (request, response) => {
  const mailOptions = {
    sender: config.mail.sender,
    recipient: config.mail.recipient,
    text: request.body.text,
    subject: request.body.subject,
  };
  mailSend(mailOptions).then((data) =>{
    response.send(JSON.stringify(data));
  });
});

//Setting GET routes
listener.get("*", (request, response) => {
  response.redirect(302, "https://www.lucacasadei.net");
});

//Listener activation
const portNumber = config.port || 3000;
listener.listen(portNumber, () => {
  console.log("Now listening on port: " + portNumber);
});
