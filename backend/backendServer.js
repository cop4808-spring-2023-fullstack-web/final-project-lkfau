//Imports
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config.js');

//app.use
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../final-project-lkfau')));
app.use(cors());

//Catch for 404 error
// app.use((req, res, next) => {
//   res.status(404).sendFile(path.join(__dirname, '//404.html//'));
// });

//MongoDB
//Favorite schema
const favoriteSchema = new mongoose.Schema ({
  business_id : String,
  business_name : String,
});

//Set favorite model
const Favorite = mongoose.model('favorite', favoriteSchema);

//Test
app.get('/addFavorite', (req, res) => {
  res.send("Add Favorites test");
});

//Functions
app.post('/addFavorite', function(req, res) {
  const favorite = new Favorite ({
    business_id : req.body.business_id,
    business_name : req.body.business_name
  });

  favorite.save()
  console.log("Added Favorite");
});

//Server
app.listen(5678); //start the server
console.log('Server is running...');