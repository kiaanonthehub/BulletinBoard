const app = require("./app");

// debugging
const debug = require("debug")("node-angular");

// HTTPS is the HTTP protocol over TLS/SSL
const http = require("https");

//  Node.js file system module allows you to work with the file system on your computer
const fs = require("fs");

// set the port number
const port = 3000;

// read the open ssl private key and certificate from the files
const server = http.createServer(
  {
    //using ssl to allow https access
    key: fs.readFileSync("./keys/privatekey.pem"),
    cert: fs.readFileSync("./keys/certificate.pem"),
  },
  app
);

// set the server to listen to the desingated port number
server.listen(port);
console.log(`Sever listening on Port ${port}`);

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