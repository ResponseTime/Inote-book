const express = require("express");
const router = express.Router();
const { fetch } = require("../middleware/fetchuser")
const Notes = require("../models/Notes")
const { body, validationResult } = require("express-validator");

router.get("/getnotes", fetch, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id })
  res.json(notes)
})

router.post("/addnote", fetch, [
  body("title").isLength({ min: 3 }),
  body("description", "enter valid email").isEmail(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {

    const note = new Notes({
      title: req.body.title,
      description: req.body.description,
      tag: req.body.tag,
      user: req.user.id
    })
    const saved = await note.save()
    res.json(saved);
  }
  catch (err) {
    res.status(500).json(err.message);
  }
})
module.exports = router;
