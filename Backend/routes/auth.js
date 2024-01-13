const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const fetch = require("../middleware/fetchuser");
router.post(
  "/signup",
  [
    body("name").isLength({ min: 3 }),
    body("email", "enter valid email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const { name, email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: email });
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(password, salt);
      if (!user) {
        user = await User.create({
          email: email,
          name: name,
          password: hashedPass,
        });
        data = {
          id: user.id,
        };
        const authToken = jwt.sign(data, secret);
        res.status(200).json({ created: true, token: authToken });
      } else {
        return res.status(400).json({ err: "user already exists" });
      }
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
);
router.post(
  "/api/login",
  [
    body("email", "enter valid email").isEmail(),
    body("password", "password cant be blank").exists(),
  ],
  async (req, res) => {
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let usr = await User.findOne({ email });
      if (!usr) {
        res.status(400).json({ err: "Wrong Credentials" });
      }
      const cmpre = await bcrypt.compare(password, usr.password);
      if (!cmpre) {
        res.status(400).json({ err: "Wrong Credentials" });
      }
      const payload = {
        id: usr.id,
      };
      const authToken = jwt.sign(payload, secret);
      res.json(authToken);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);
router.post("/api/getuser", fetch, async (req, res) => {
  try {
    let uId = req.user;
    const user = await User.findById(uId).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
