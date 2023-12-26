const jwt = require("jsonwebtoken");
const secret = "recet";
const fetch = (req, res, next) => {
  const token = req.header("Token");
  if (!token) {
    res.status(401).json({ message: "Error" });
  }
  try {
    const string = jwt.verify(token, secret);
    const data = string.data;
    req.data = data;
    next();
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

module.exports = fetch;
