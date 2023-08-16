// Import builtin NodeJs modules to instantiate the service
const https = require("https");
const http = require("http");
const fs = require("fs");

// Import the express module
const express = require("express");

// Instanatiate an express application
const app = express();
const serverOptions = {
    key: fs.readFileSync('server-private-key.pem'),
    cert: fs.readFileSync('server-certificate.pem'),
    requestCert: true,
    rejectUnauthorized: true
}

// Create a Node JS HTTPS listener on port 4000 that points to the Express app
// Use a callback function to tell when the server is created.
https
    .createServer(serverOptions, app)
    .listen(443, () => {
        console.log('server is running at port 443');
    })

// Create a try point route for the Express app listening on port 4000.
// This code tells the service to listen to any request coming to the / route.
// Once the request is received it will display a message "Hello from Express Server"

app.get('/', (req, res) => {
    res.send("Hello from express server");
})