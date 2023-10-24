//Environment costants
const express = require("express");
const listener = express();
const config = require("../config/config")

//Setting routes
listener.get("*",(request,response)=>{
    response.redirect(302,"https://www.lucacasadei.net");
})

//Listener activation
const portNumber = config.port || 3000;
listener.listen(portNumber, ()=>{
    console.log("Now listening on port: " + portNumber)
})