// grabbing the main Express module from the package installed
const express = require("express");
const router = express.Router();

// point to user model
const User = require("../models/users");

// security - used for hashing the user password before inserting to the database
const bcrypt = require("bcrypt");

// used for managing user sessions,
const jwt = require("jsonwebtoken");

// post method used for registering user
router.post("/signup", (req, res) => {
  // hashing the users password
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      username: req.body.username,
      password: hash,
      department: req.body.department,
    });

    console.log("user created");
    console.log(user);

    user
      .save()
      .then((result) => {
        res.status(201).json({
          message: "User created",
          result: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  });
});

// post methdd used for user login
router.post("/login", (req, res) => {
  let fetchedUser;

  // checks the database to see if the username exists
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Authentication Failture",
        });
      }

      fetchedUser = user;

      // if the user exists , compare the current users password entered with the password in the database
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: "Authentication Failture",
        });
      }

      // if the login password is valid , a jwd is generated
      const token = jwt.sign(
        {
          username: fetchedUser.username,
          department: fetchedUser.department,
        },
        "secret_this_should_be_longer_time_is",

        //token is given an expiry time to help prevent session jacking
        { expiresIn: "1h" }
      );

      res.status(200).json({ token: token });
    })
    .catch((err) => {
      return res.status(201).json({
        message: "Authentication Failture",
      });
    });
});

module.exports = router;

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