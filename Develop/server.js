// Dependencies
const express = require("express");
const fs = require("fs");
const db = require("../Develop/db/db.json");
const path = require("path");

// Tells node that we are creating an "express" server
const app = express();

// Port
const PORT = process.env.PORT || 8008;



// Sets up the Express App to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// API Routes

// Displays all notes to user
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './db/db.json'));
});
    
// Posts your notes to the DB.JSON file
app.post('/api/notes', (req, res) => {
    const newNotes = req.body;

    db.push(newNotes);
    let data = fs.readFile("./db/db.json", "utf-8", (err, data) => {
        if (err) throw err;
        const json = JSON.parse(data);

        json.push(newNotes);

        fs.writeFile("./db/db.json", JSON.stringify(json), (err, data) => {
            if (err) throw err;
        });
        res.json(newNotes);
    });
});

// HTML Routes
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, "./public/notes.html")));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, "./public/index.html")));

// Server Listener
app.listen(PORT, () => console.log(`App listening on PORT: ${PORT}`));

