// Import builtin NodeJs modules to instantiate the service
const express = require("express");
const https = require("https");
const fs = require("fs");

const app = express();

async function startServer() {
  try {
      const serverOptions = {
    	key: fs.readFileSync('server-private-key.pem'),
      	cert: fs.readFileSync('server-certificate.pem'),
      	ca: fs.readFileSync('root-ca-certificate.pem'),
      	requestCert: true,
      	rejectUnauthorized: true
      };

     https.createServer(serverOptions, app).listen(443, () => {
      console.log("server is running at port 443");
    });

    
    app.get("/", (req, res) => {
      res.send("Hello from express server");
    });
  } catch (error) {
    console.error("Error: ", error);
  }
}


startServer();
