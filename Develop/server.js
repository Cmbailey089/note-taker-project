const express = require('express');
const path = require('path');
const fs = require('fs');
const unid = require('./helper/uuid');
let notes = require('./db/db.json')



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

app.get('/api/notes', (req,res) => {
  res.json(notes) 
  console.info(`${req.method}`)
});

app.post('/api/notes', (req, res) => {
 
  console.info('duh');
  const { title,text } = req.body;
  if (title && text) {
   
    let newNotes = {
      title,
      text,
      note_id: unid(),
  };
  notes.push(newNotes);

  fs.writeFile(path.join(__dirname,'../Develop/db/db.json'),JSON.stringify((notes), null, 3),
    (writeErr) =>{
      writeErr
        ? console.error(writeErr)
        : console.info('Successfully updated reviews!')

        return res.json(notes);
    });
 }});



app.listen(PORT, () =>
 console.log(`listening at http://localhost:${PORT}`));

