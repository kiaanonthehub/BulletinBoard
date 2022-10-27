// grabbing the main Express module from the package installed
const express = require("express");
const app = express();

// path for url
const urlPrefix = "/api";

// include mongoose in our project and open a connection to the test database
const mongoose = require("mongoose");

//  Node.js file system module allows you to work with the file system on your computer
const fs = require("fs");

// ssl certificate
const cert = fs.readFileSync("keys/certificate.pem");

//A Certificate Authority is a trusted source for an SSL certificate, and using a certificate from a CA allows your users to trust the identity of your website.
const options = { server: { sslCA: cert } };

// connection string
const connectionString =
  "mongodb+srv://ST10116983:9LovmCrTfyfAL6Qj@apds7311-poe.zxmymd9.mongodb.net/?retryWrites=true&w=majority";

// defined in routes.posts.js / users.js;
const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/users");

// connects to mongodb
mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Connected to db");
  })
  .catch(() => {
    console.log("Not connected to db");
  }, options);

app.use(express.json());

// catering for CORS
// allows the front end to call the backend
app.use((reg, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "*");
  next();
});

// utilise the routes defined in routes.posts.js/users.js
app.use(urlPrefix + "/posts", postRoutes);
app.use(urlPrefix + "/user", userRoutes);

module.exports = app;

/*
Code Attribution

Author: Bruce .S (IIE)
Source: APDS7311 Lab Guide 2022 (First Edition)


Links: 
Node Package Manager - https://docs.npmjs.com
Nodemon - https://www.npmjs.com/package/nodemon
W3Schools - https://www.w3schools.com/nodejs/default.asp
Visual Studio Code Marketplace - https://code.visualstudio.com/docs/editor/extension-marketplace
Mozilla - https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview
ExpressJs - https://expressjs.com/en/starter/hello-world.html
JSON - https://www.json.org/json-en.html
Mongoose - https://mongoosejs.com
Mozilla - https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

*/