const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const userSchema = new Schema({
  name: {
    type: "string",
    required: true,
  },
  password: {
    type: "string",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  email: {
    type: "string",
    required: true,
    unique: true,
  },
});
const User = mongoose.model("user", userSchema);
module.exports = User;
