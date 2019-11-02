const express = require('express');
const path = require('path');
const app = express();

const mongoose = require('mongoose');

const dbRoute =
  'mongodb+srv://dev:jsi43k1xbWITjAsw@rejection-fe1ny.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.get('/json', (req, res) => {
  console.log('bad bad cat');
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);
