// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const Note = require('./Note');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());


const logFilePath = path.join(__dirname, 'log.txt');

// Create the file if it doesn't exist
fs.openSync(logFilePath, 'a');

// Create a writable stream for appending data to the log file
const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });

// Add logger middleware with stream to log into log.txt
app.use(morgan('combined', { stream: logStream }));

// MongoDB Atlas connection URI
const url = process.env.MONGODB_CONNECTION_URL;

mongoose.connect(url)
  .then(() => {
    console.log('MongoDB connected');
    // addNotes();
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Function to add 50 notes
async function addNotes() {
  try {
    await Note.deleteMany();

    const notes = [];
    for (let i = 1; i <= 30; i++) {
      const note = new Note({
        id: i,
        title: `Note ${i}`,
        author: {
          name: `Author ${i}`,
          email: `mail_${i}@gmail.com`
        },
        content: `Content for note ${i}`
      });
      notes.push(note);
    }

    await Note.insertMany(notes);
    console.log('Added 50 notes successfully');
  } catch (err) {
    console.error('Error adding notes:', err);
  }
}

app.get('/notes/counts', async (req, res) => {
  try {
    const count = await Note.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to fetch all notes
app.get('/notes', async (req, res) => {
  try {
    const start = parseInt(req.query._start) || 0;
    const end = parseInt(req.query._end) || 10;
    const limit = end - start;
    const notes = await Note.find({}).skip(start).limit(limit);
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/notes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findOne({ id: id });
    if (note) {
      res.json(note);
    } else {
      res.status(404).json({ error: 'Note not found' });
    }
  } catch (error) {
    res.status(404).json({ error: 'Internal server error' });
  }
});

app.delete('/notes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findOneAndDelete({ id: id });
    if (note) {
      res.status(204).json(note);
    } else {
      res.status(404).json({ error: 'Note not found' });
      console.log('Note not found');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

let nextId = 100;

app.post('/notes', async (req, res) => {
  console.log('Received data:', req.body);

  const { title, author, content } = req.body;

  const newNote = new Note({
    id: nextId++,
    title,
    author,
    content
  });

  try {
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/notes/:id', async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  try {
    const updatedNote = await Note.findOneAndUpdate({ id: id }, { content: content }, { new: true });
    if (updatedNote) {
      res.json(updatedNote);
    } else {
      res.status(404).json({ error: 'Note not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
