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

router.put("/editnote/:id", fetch, async (req, res) => {
  const { title, description, tag } = req.body;
  const newNote = {};
  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }
  let note = await Notes.findById(req.params.id);
  if (!note) {
    return res.json({ success: false })
  }
  if (note.user.toString() !== req.user.id) {
    return res.json({ success: false })
  }
  note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
  res.json(note)
})

router.delete("/deletenote/:id", fetch, async (req, res) => {
  const note = await Notes.findById(req.params.id)
  if (note.user.toString() !== req.user.id) {
    return res.json({ success: false })
  }
  await Notes.findByIdAndDelete(req.params.id)
  res.json({ success: true })
})
module.exports = router;
