const express = require('express');
const notes = require('./db/db.json');
const path = require('path');


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

app.get('/api/notes', (req,res) => res.json(notes));

app.post('/api/notes', (req, res) => {
    // Let the client know that their POST request was received
    res.json(`${req.method} request received`);
  
// Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  if (product && review && username) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
    };


    

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

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
    // Show the user agent information in the terminal
    console.info(req.rawHeaders);
  
    // Log our request to the terminal
    console.info(`${req.method} request received`);
  });
  







app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
