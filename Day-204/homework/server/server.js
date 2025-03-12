const express = require("express");
const fs = require("fs");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express();
const NOTES_FILE = "./notes.json";

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());

// Read notes from file
const readNotes = () => {
  try {
    return JSON.parse(fs.readFileSync(NOTES_FILE, "utf8"));
  } catch (error) {
    return [];
  }
};

// Write notes to file
const writeNotes = (notes) => {
  fs.writeFileSync(NOTES_FILE, JSON.stringify(notes, null, 2));
};

// Get all notes
app.get("/notes", (req, res) => {
  res.json(readNotes());
});

// Add new note
app.post("/notes", (req, res) => {
  const notes = readNotes();
  const newNote = { id: Date.now(), text: req.body.text, createdAt: new Date() };
  notes.push(newNote);
  writeNotes(notes);
  res.status(201).json(newNote);
});

// Update note
app.put("/notes/:id", (req, res) => {
  let notes = readNotes();
  const noteIndex = notes.findIndex((n) => n.id == req.params.id);
  if (noteIndex !== -1) {
    notes[noteIndex].text = req.body.text;
    writeNotes(notes);
    res.json(notes[noteIndex]);
  } else {
    res.status(404).json({ message: "Note not found" });
  }
});

// Delete note
app.delete("/notes/:id", (req, res) => {
  let notes = readNotes();
  notes = notes.filter((n) => n.id != req.params.id);
  writeNotes(notes);
  res.json({ message: "Note deleted" });
});

// Start server
app.listen(3000, () => {
  console.log(`Server running on http://localhost:3000`);
});
