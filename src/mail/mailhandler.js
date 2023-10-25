const resend = require("resend");
const config = require("../../config/config");
const { text } = require("express");
const msender = new resend.Resend(config.mail.api_key);

async function mailSend({ sender, recipient, subject, options }) {
  const htmlTemplate =
    '<!DOCTYPE html> <html lang="en"> <head> <title>Luca Casadei Web Mailer</title> </head> <body> <main style="text-align: center; margin: 100px;"> <h1 style="color: red">Luca Casadei Web Mailer</h1> <section> <table style=" border-color: black; border-style: solid; border-width: 1px; border-spacing: 20px; text-align: center; margin-left: auto; margin-right: auto; " > <thead> <tr > <th>Name:</th> <th>Surname:</th> <th>Email:</th> <th>Company:</th> </tr> </thead> <tbody> <tr> <td>' +
    options.name +
    "</td> <td>" +
    options.surname +
    "</td> <td>" +
    options.email +
    "</td> <td>" +
    options.company +
    "</td> </tr> </tbody> </table> </section> <section> <h3>Contenuto:</h3> <p>" +
    options.text +
    " </p> </section> </main> </body> </html>";
  try {
    const data = await msender.emails.send({
      from: sender,
      to: recipient,
      subject: subject,
      html: htmlTemplate,
    });
    return data;
  } catch (error) {
    return error;
  }
}

module.exports = mailSend;
