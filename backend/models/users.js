const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");

/* mongoose-unique-validator is a plugin which adds pre-save validation for unique fields within a Mongoose schema.
 This makes error handling much easier, since you will get a Mongoose validation error when you attempt to violate a unique constraint, rather than an E11000 error from MongoDB
const uniqueValidator = require("mongoose-unique-validator"); 

code available at : https://www.npmjs.com/package/mongoose-unique-validator
*/

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    uniqueCaseInsensitive: true,
  },
  password: { type: String, required: true },
  department: { type: String, required: true },
});

// Apply the uniqueValidator plugin to userSchema.
userSchema.plugin(uniqueValidator, {
  message: "Error, expected {PATH} to be unique.",
});

module.exports = mongoose.model("User", userSchema);
