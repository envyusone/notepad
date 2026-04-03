import express from "express";
import notesRouter from "./api/notes.js";

const app = express();

// Preprocessing: JSON body parser 
app.use(express.json());

// Preprocessing: Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// Route-handling: Mount the router
app.use("/notes", notesRouter);

// Error-handling: Catch-all 
app.use((err, req, res, next) => {
  res.status(500).send("Sorry! Something went wrong :(");
});

export default app;
