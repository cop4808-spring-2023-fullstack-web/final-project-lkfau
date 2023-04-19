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

//FavoriteInfo schema------------------------------------>UPDATE SCHEMA; INCLUDE MORE RELEVANT INFO TO DISPLAY
const favoriteInfoSchema = new mongoose.Schema ({
  _id : String,
  business_name : String,
}, { versionKey: false });

//Set favorite model
const Favorite = mongoose.model('favorite', favoriteInfoSchema);

//Functions
//Add Favorite
app.post('/addFavorite', function(req, res) {
  const favorite = new Favorite ({
    _id : req.body._id,
    business_name : req.body.business_name
  });

  favorite.save()
  res.send(`Added ${favorite} to favorites`)
  console.log("Added Favorite");
});

//Delete Favorite
app.delete('/deleteFavorite', async(req, res) => {
  var business_id = req.body._id;
  const favorite = await Favorite.findByIdAndDelete(business_id);
  res.send(`Deleted ${favorite.business_name} from favorites`)
  console.log("Deleted Favorite");
});

//View Favorite
app.get('/viewFavorite', async(req, res) => {
  var business_id = req.body._id;
  const favorite = await Favorite.findById(business_id);
  res.send(`Viewing ${favorite.business_name} from favorites`)
  console.log("View Favorite");
});

//List all favorites
app.get('/listFavorites', async(req, res) => {
  const favorite = await Favorite.find();
  res.send(`Listing ${favorite} from favorites`)
  console.log("Listing Favorites");
});

//Server
app.listen(5678); //start the server
console.log('Server is running...');