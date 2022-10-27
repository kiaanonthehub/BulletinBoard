const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const posts = require("../models/posts");

// GET
// get all posts
router.get('', (req, res, next) => {
  posts.find().then((documents) => {
    res.json({
      message: "Retrieved posts",
      posts: documents.reverse(),
    });
    console.log("posts recieved");
  });
});

// POST
// create a post
router.post('', checkAuth, (req, res, next) => {
  const post = new posts({
    username: req.body.username,
    date: req.body.date,
    department: req.body.department,
    postContent: req.body.postContent,
  });

  post.save().then((createdPost) => {
    console.log("creating post ...");
    console.log(createdPost);
    res.status(201).json({
      message: "post created",
      postID: createdPost._id,
    });
  });
  console.log(post);
});

// DELETE
// delete a post
router.delete("/:id", checkAuth, (req, res, next) => {
  posts.deleteOne({ _id: req.params.id }).then((result) => {
    res.status(200).json({ message: "Post Deleted" });
    console.log("posts deleted from the database");
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