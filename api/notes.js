// TODO: this file :)
import express from "express";
import { getNotes, getNoteById, addNote } from "../db/notes.js";

const notesRouter = express.Router();

// GET /notes - Returns all notes
notesRouter.get("/", (req, res) => {
  res.json(getNotes());
});

// GET /notes/:id - Returns a specific note
notesRouter.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const note = getNoteById(id);

  if (!note) {
    return res.status(404).send("Note not found");
  }

  res.json(note);
});

// POST /notes - Creates a new note
notesRouter.post("/", (req, res) => {
  // 1. Check if the entire body is missing
  if (req.body === undefined || Object.keys(req.body).length === 0 && !req.headers['content-type']) {
    return res.status(400).send("Request must have a body.");
  }

  // 2. Check if text property is missing inside the body
  if (!req.body.text) {
    return res.status(400).send("New note must have text.");
  }

  // 3. Success: create and send the note
  const newNote = addNote(req.body.text);
  res.status(201).json(newNote);
});

export default notesRouter;
