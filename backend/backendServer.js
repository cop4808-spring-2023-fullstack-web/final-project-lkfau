//Imports
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerDocument = require('./swagger.json');
const cors = require('cors');
const config = require('./config.js');

//Swagger configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Database and YELP API endpoint',
      version: '1.0.0',
    },
  },
  apis: ['backendServer.js'], // Specify the file(s) that contain the API routes
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

//app.use
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../final-project-lkfau')));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(cors());

//Catch for 404 error
// app.use((req, res, next) => {
//   res.status(404).sendFile(path.join(__dirname, '//404.html//'));
// });

//FavoriteInfo schema
const favoriteInfoSchema = new mongoose.Schema ({
  user_id : String,
  business_id : String
}, { versionKey: false });

//Set favorite model
const Favorite = mongoose.model('favorite', favoriteInfoSchema);

//Functions
//Add Favorite
app.post('/addFavorite', function(req, res) {
  const favorite = new Favorite ({
    user_id : req.body.user_id,
    business_id : req.body.business_id,
  });

  favorite.save()
  res.send(`Added ${favorite} to favorites`)
});

//Delete Favorite
app.delete('/deleteFavorite', async(req, res) => {
  var user_id = req.body.user_id;
  var business_id = req.body.business_id;
  try {
    const favorite = await Favorite.findOneAndDelete({ user_id: user_id, business_id: business_id });
    if (favorite) {
      res.send("Deleted Favorite");
    } else {
      res.status(404).json({ message: "Favorite not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Error deleting favorite");
  }
});

//View Favorite
app.get('/viewFavorite', async(req, res) => {
  var user_id = req.body.user_id;
  var business_id = req.body.business_id;
  try {
    const favorite = await Favorite.findOne({ user_id: user_id, business_id: business_id });
    if (favorite) {
      res.send(`Viewing ${favorite} from favorites`)
    } else {
      res.status(404).json({ message: "Favorite not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Error viewing favorite");
  }
});

//List all favorites
app.get('/listFavorites', async(req, res) => {
  var user_id = req.body.user_id;
  try {
    const favorite = await Favorite.find({ user_id: user_id });
    if (favorite) {
      res.send(`Viewing ${favorite} from favorites`)
    } else {
      res.status(404).json({ message: "Favorites not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Error viewing favorites");
  }
});

//Server
app.listen(5678); //start the server
console.log('Server is running...');