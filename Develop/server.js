const express = require('express');
const path = require('path');
const fs = require('fs');
const unid = require('./helper/uuid');



const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/notes', (req,res) =>
  res.sendFile(path.join(__dirname, './public/notes.html')));

app.get('*', (req,res) => 
  res.sendFile(path.join(__dirname, './public/index.html')))

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html')));

app.get('/api/db/db.json', (req,res) => {
  res.json('/api/db.db.json') 
  console.info(`${req.method}`)
});

// POST request to add a review
app.post('/api/db/db.json', (req, res) => {
  // Log that a POST request was received
  console.info();

  // Destructuring assignment for the items in req.body
  const { title,text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNotes = {
      title,
      text,
      note_id: unid(),
  };
  req.body.push(newNotes);

  fs.writeFile(path.join(__dirname, './db/db.json'),JSON.stringify(JSON.parse(data), null, 3),
    (writeErr) =>
      writeErr
        ? console.error(writeErr)
        : console.info('Successfully updated reviews!')
  );

   
  }});

app.listen(PORT, () =>
 console.log(`listening at http://localhost:${PORT}`));

