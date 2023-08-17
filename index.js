// Import builtin NodeJs modules to instantiate the service
const express = require("express");
const https = require("https");
const fs = require("fs");
const AWS = require("aws-sdk");

const app = express();
const secretsManager = new AWS.SecretsManager();

async function startServer() {
  try {
    const { ServerKey, ServerCert, CACert } = await getCertificatesFromSecretsManager();
    const serverOptions = {
      // key: fs.readFileSync('server-private-key.pem'),
      // cert: fs.readFileSync('server-certificate.pem'),
      // ca: fs.readFileSync('root-ca-certificate.pem'),
      key: ServerKey,
      cert: ServerCert,
      ca: CACert,
      requestCert: true,
      rejectUnauthorized: true
    };

    // Create a Node JS HTTPS listener on port 4000 that points to the Express app
    // Use a callback function to tell when the server is created.
    https.createServer(serverOptions, app).listen(443, () => {
      console.log("server is running at port 443");
    });

    // Create a try point route for the Express app listening on port 4000.
    // This code tells the service to listen to any request coming to the / route.
    // Once the request is received it will display a message "Hello from Express Server"

    app.get("/", (req, res) => {
      res.send("Hello from express server");
    });
  } catch (error) {
    console.error("Error: ", error);
  }
}

async function getCertificatesFromSecretsManager() {
  const secrets = await secretsManager.getSecretValue({ SecretId: "mutualTLSDemoCertificates" }).promise();
  return JSON.parse(secrets.SecretString);
}

startServer();
