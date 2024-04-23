const express = require('express');
const notes = require('./db/db.json');
const path = require('path');
const fs = require('fs');
const noteid = require('./public/assets/js/noteID.js');
const { readFromFile, readAndAppend } = require('./public/assets/js/fsUtils.js');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('public'));


app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/api/notes', (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));  
});

app.post('/api/notes', (req, res) => {
  // Let the client know that their POST request was received
  res.json(`${req.method} request received`);

  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  if (title && text) {
    // Variable for the object we will save
    const newNote = [{
      title,
      text,
      id: noteid(),
    }];

    
    // Obtain existing reviews
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        // Convert string into JSON object
        const parsedNotes = JSON.parse(data);

        // Add a new review
        parsedNotes.push(newNote);

        // Write updated reviews back to the file
        fs.writeFile(
          './db/db.json',
          JSON.stringify(parsedNotes, null, 4),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info('Successfully updated reviews!')
        );
      }
    });


    const response = {
      status: 'success',
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in note');
  }
});


// Show the user agent information in the terminal
//console.info(req.rawHeaders);

// Log our request to the terminal
//console.info(`${req.method} request received`);








app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
