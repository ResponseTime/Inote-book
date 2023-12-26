const mongoose = require("mongoose");
const uri = process.env.URI;
const connectDb = () => {
  mongoose.connect(uri, () => {
    console.log("connected to database");
  });
};

module.exports = connectDb;
