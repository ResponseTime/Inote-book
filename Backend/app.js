const express = require("express");
const app = express();
const connect = require("./db.js");
const cors = require("cors");
connect();
app.use(express.json());
app.use("api/auth", require("./routes/auth"));
app.use("api/notes", require("./routes/notes"));
app.use(cors())
app.listen(port, () => {
  console.log("Running");
});
