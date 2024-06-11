//Configuration and mailer constants
const config = require("../config/config");

//File Readers
const fs = require("fs");
const http = require("http");
const https = require("https");

//Certificate loading
const privateKey = fs.readFileSync(
  config.certpath + "casadeiddnsnet.key",
  "utf-8"
);
const certificate = fs.readFileSync(
  config.certpath + "casadei_ddns_net.pem",
  "utf-8"
);

//Express constants
const express = require("express");
const jsonParser = express.json();
const app = express();

const cors = require("cors");
app.use(cors({origin : "https://www.lucacasadei.net"}));

//Listener defining
const fallbackPort = 3000;
const fallbackSecurePort = 3443;
const httpListener = http.createServer(app);
const httpsListener = https.createServer(
  { key: privateKey, cert: certificate },
  app
);

//Downloads my publicly shared CV
app.get("/getcv", (request, response) => {
  const filePath = config.resourcepath + "CVLucaCasadeiCert.pdf";
  response.download(filePath);
});

//Online checker
app.get("/ison",(request,response)=>{
  response.json({
    "online" : "true",
  })
})

//Setting GET routes
app.get("*", (request, response) => {
  response.redirect(302, "https://www.lucacasadei.net");
});

//Listener activation
if (!config.port) {
  console.log(
    "Warning, no port is defined in the HTTP environment, using fallback: " +
      fallbackPort
  );
}
if (!config.secureport) {
  console.log(
    "Warning, no HTTPS port specified, using fallback" + fallbackSecurePort
  );
}

//Ports loading
const portNumber = config.port || fallbackPort;
const securePortNumber = config.secureport || fallbackPort;

httpsListener.listen(securePortNumber, () => {
  console.log("HTTPS Listener started and working.");
});
httpListener.listen(portNumber, () => {
  console.log("HTTP Listener started and working.");
});
