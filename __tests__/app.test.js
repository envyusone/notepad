import { describe, it, expect, test } from "vitest";
import request from "supertest";

import app from "#app";
import { getNotes, getNoteById, addNote } from "#db/notes";
import notesRouter from "#api/notes";

test("The app sends 404 for non-existent route DELETE /foobar", async () => {
  const response = await request(app).delete("/foobar");
  expect(response.status).toBe(404);
});

test("The /notes router is defined", () => {
  expect(notesRouter).toBeDefined();
});

test("GET /notes sends back the array of notes", async () => {
  const response = await request(app).get("/notes");
  const notes = getNotes();
  expect(response.status).toBe(200);
  expect(response.body).toEqual(notes);
});

describe("POST /notes", () => {
  it("sends 400 if request does not have a body", async () => {
    const response = await request(app).post("/notes");
    expect(response.status).toBe(400);
    expect(response.text).toBe("Request must have a body.");
  });

  it("sends 400 if text is not provided in the request body", async () => {
    const response = await request(app).post("/notes").send({});
    expect(response.status).toBe(400);
    expect(response.text).toBe("New note must have text.");
  });

  it("responds with status 201 and sends a new note with text from the request body", async () => {
    const text = "New note";
    const response = await request(app).post("/notes").send({ text });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("text");
    expect(response.body.text).toBe(text);
  });
});

describe("GET /notes/:id", () => {
  it("sends 404 if the note with the given id does not exist", async () => {
    const response = await request(app).get("/notes/0");
    expect(response.status).toBe(404);
  });

  it("sends the note with the given id", async () => {
    const id = 1;
    const note = getNoteById(id);
    const response = await request(app).get("/notes/" + id);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(note);
  });
});
