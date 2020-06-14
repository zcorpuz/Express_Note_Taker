// Dependencies
const express = require("express");

// Tells node that we are creating an "express" server
const app = express();

// Port
const PORT = process.env.PORT || 8008;

// Sets up the Express App to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// HTML Routes
// =====================================================
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, "../assets/notes.html")));
app.get('*', (req, res) res.sendFile(path.join(__dirname, "../assets/index.html")));

// Server Listener
app.listen(PORT, () => console.log(`App listening on PORT: ${PORT}`));

