const resend = require("resend");
const config = require("../../config/config");
const msender = new resend.Resend(config.mail.api_key);

async function mailSend({sender,recipient,subject,text}){
    try{
        const data = await msender.emails.send({
            from: sender,
            to: recipient,
            subject: subject,
            text: text
        });
        return data;
    }
    catch(error){
        return error;
    }
}

module.exports = mailSend