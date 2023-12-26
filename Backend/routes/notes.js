const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ hell: true });
});

module.exports = router;
