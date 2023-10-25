//Express constants
const express = require("express");
const listener = express();
const jsonParser = express.json();

//CORS
const cors = require("cors");
listener.use(cors());

//Configuration and mailer constants
const config = require("../config/config");
const mailSend = require("./mail/mailhandler");

listener.post("/send", jsonParser, (request, response) => {
  const mailOptions = {
    sender: config.mail.sender,
    recipient: config.mail.recipient,
    subject: request.body.subject,
    options:{
      text: request.body.text,
      name: request.body.name,
      surname: request.body.surname,
      email: request.body.email,
      company: request.body.company
    }
  };
  mailSend(mailOptions).then((data) =>{
    response.send(data);
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
