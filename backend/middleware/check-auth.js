const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "secret_this_should_be_longer_time_is");
    console.log("Token Verified");
    next();
  } catch (error) {
    console.log("Error with Token [Middleware]");
    res.status(401).json({
      message: "Unauthorized Request",
    });
  }
};
