// Dependencies
const express = require("express");
const fs = require("fs");
const db = require("./db/db.json");
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
    newNotes.id = req.body.title;

    let data = fs.readFile("./db/db.json", "utf-8", (err, data) => {
        if (err) throw err;
        // Parse Data
        let json = JSON.parse(data);
        // Push new notes to DB.json file
        json.push(newNotes);

        fs.writeFile("./db/db.json", JSON.stringify(json), (err, data) => {
            if (err) throw err;
        });
        res.json(newNotes);
    });
});

// Delete notes API
app.delete('/api/notes/:id', (req, res) => {
    // Read all notes in the db.json file
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        if (err) throw err;

        // Parse through notes array
        const jsonID = JSON.parse(data);
        // Find the id in the array
        const idDelete = jsonID.find(newNote => newNote.id === req.params.id);

        // Assign the index location of the id to a variable
        const idIndex = jsonID.indexOf(idDelete);
        // Splice the object out of the array
        jsonID.splice(idIndex, 1);

        // Write the new notes array
        fs.writeFile("./db/db.json", JSON.stringify(jsonID), (err, data) => {
            if (err) throw err;
            res.json(jsonID);
        });
    })        
});   


// HTML Routes
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, "/public/notes.html")));
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "/public/index.html")));

// Server Listener
app.listen(PORT, () => console.log(`App listening on PORT: ${PORT}`));

