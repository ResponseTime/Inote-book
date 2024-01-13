const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const notesSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  title: {
    type: "string",
    required: true,
  },
  body: {
    type: "string",
    required: true,
  },
  tag: {
    type: "string",
    default: "General",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("notes", notesSchema);
