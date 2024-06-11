require("dotenv").config();

const configOptions = {
  port: process.env.PORT,
  secureport: process.env.SECURE_PORT,
  mail: {
    recipient: "casadeiluca30@gmail.com",
    sender: "webmailer@lucacasadei.net",
    api_key: process.env.MAIL_API_KEY,
  },
  resourcepath: `${__dirname}/../public/resources/`,
  certpath: `${__dirname}/../certificates/`,
};

module.exports = configOptions;
