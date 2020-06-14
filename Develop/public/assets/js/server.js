// Dependencies
const express = require("express");
// Do we need this? const fs = require("fs");

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
// Need to set up GET API for /api/notes- Should read the db.json file and return all saves notes as JSON
app.get('/api/notes', (req, res) => 
    // fs.readFile("../assets/public/db/db.json", 'utf8', (err, data) => {
    //     if(err) {
    //         console.log(err);
    //     } else {
    //         return data;
    //     }
    // });
    return res.json(//need to create a variable for db.json);
);
// Neet to set up POST API for /api/notes- Should receive a new note to save on the request body, addit to the db.json file, then return the new note to the client
app.post('/api/notes', (req, res) => {

})

// HTML Routes
// =====================================================
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, "../assets/notes.html")));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, "../assets/index.html")));

// Server Listener
// =====================================================
app.listen(PORT, () => console.log(`App listening on PORT: ${PORT}`));

