// Dependencies
const express = require("express");
const fs = require("fs");
const db = require("../Develop/db/db.json");

// Tells node that we are creating an "express" server
const app = express();

// Port
const PORT = process.env.PORT || 8008;



// Sets up the Express App to handle data parsing
// =====================================================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API Routes
// =====================================================
app.get('/api/notes', (req, res) => 
    fs.readFile(db, 'utf8', (err, data) => {
        if(err) {
            console.log(err);
        } else {
            return data;
        }
    })
);
// Neet to set up POST API for /api/notes- Should receive a new note to save on the request body, addit to the db.json file, then return the new note to the client
app.post('/api/notes', (req, res) => {
    const newNotes = req.body;
    let data = fs.readFileSync('../Develop/db/db.json');
    newNotes.routeName = newNotes.name.replace(/\s+/g, "").toLowerCase();

    data.push(newNotes);

    fs.writeFile(data, newNotes, (err, data) => {
        if (err) throw err;
    });
    res.json(newNotes);
})

// HTML Routes
// =====================================================
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, "/public/notes.html")));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, "/public/index.html")));

// Server Listener
// =====================================================
app.listen(PORT, () => console.log(`App listening on PORT: ${PORT}`));

