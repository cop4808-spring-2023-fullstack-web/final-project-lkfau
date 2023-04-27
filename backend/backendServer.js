//Imports
const express = require("express");
require("dotenv").config();
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const http = require("http");
const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerDocument = require("./swagger.json");
const cors = require("cors");
const config = require("./config.js");
const axios = require("axios");
const admin = require("firebase-admin");
const adminConfig = {
  type: process.env.TYPE,
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY,
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
};
admin.initializeApp({
  credential: admin.credential.cert(adminConfig),
});

//Swagger configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Database and YELP API endpoint",
      version: "1.0.0",
    },
  },
  apis: ["backendServer.js"], // Specify the file(s) that contain the API routes
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

//app.use
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../final-project-lkfau")));
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(cors());

//Catch for 404 error
// app.use((req, res, next) => {
//   res.status(404).sendFile(path.join(__dirname, '//404.html//'));
// });

//FavoriteInfo schema
const favoriteInfoSchema = new mongoose.Schema(
  {
    user_id: String,
    business_id: String,
  },
  { versionKey: false }
);

//Set favorite model
const Favorite = mongoose.model("favorite", favoriteInfoSchema);

const validateUser = (token) => {
  const user = admin.auth().verifyIdToken(token);
  return user;
};

//Functions
//Add Favorite
app.post("/api/favorite", async (req, res) => {
  // idToken comes from the client app
  user = await validateUser(req.headers.authorization);
  const favorite = new Favorite({
    user_id: user.uid,
    business_id: req.body.business_id,
  });

  favorite.save();
  res.send(`Added ${favorite} to favorites`);
});

//Delete Favorite
app.delete("/api/favorite", async (req, res) => {
  var user_id = req.body.user_id;
  var business_id = req.body.business_id;
  try {
    const favorite = await Favorite.findOneAndDelete({
      user_id: user_id,
      business_id: business_id,
    });
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
app.get("/api/favorite", async (req, res) => {
  var user_id = req.body.user_id;
  var business_id = req.body.business_id;
  try {
    const favorite = await Favorite.findOne({
      user_id: user_id,
      business_id: business_id,
    });
    if (favorite) {
      res.send(`Viewing ${favorite} from favorites`);
    } else {
      res.status(404).json({ message: "Favorite not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Error viewing favorite");
  }
});

//List all favorites
app.get("/api/favorites", async (req, res) => {
  var user_id = req.body.user_id;
  try {
    const favorite = await Favorite.find({ user_id: user_id });
    if (favorite) {
      res.send(`Viewing ${favorite} from favorites`);
    } else {
      res.status(404).json({ message: "Favorites not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Error viewing favorites");
  }
});

//Search businesses by location
app.get("/api/search", async (req, res) => {
  let latitude, longitude, location, term, offset;
  try {
    if (Object.hasOwn(req.query, "lat") && Object.hasOwn(req.query, "long")) {
      latitude = Number(req.query.lat);
      longitude = Number(req.query.long);
      location = req.query.loc || "%27%27"; //For some reason yelp api call does not work if I just put empty string,
    } else {
      //but will send an empty string if I set location = to %27%27
      latitude = ""; //which is the URL-encoded representation of two single quotes
      longitude = "";
      location = req.query.loc;
    }

    //Add more params here later on to deal with filters being added
    term = req.query.term || "";
    offset = Math.floor(req.query.page * 10) || 0;
    const response = await axios.get(
      `https://api.yelp.com/v3/businesses/search?latitude=${latitude}&longitude=${longitude}&location=${location}&term=${term}&limit=10&offset=${offset}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.YELP_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response) {
      res.send(response.data);
    } else {
      res.status(404).json({ message: "Error" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error" });
  }
});

//Get info on business by business id
app.get("/api/view", async (req, res) => {
  var business_id = req.body.business_id;
  try {
    const response = await axios.get(
      `https://api.yelp.com/v3/businesses/${business_id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.YELP_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response) {
      res.send(response.data);
    } else {
      res.status(404).json({ message: "Error" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
});

//Get reviews for a business by business id
app.get("/api/review", async (req, res) => {
  var business_id = req.body.business_id;
  try {
    const response = await axios.get(
      `https://api.yelp.com/v3/businesses/${business_id}/reviews`,
      {
        headers: {
          Authorization: `Bearer ${process.env.YELP_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response) {
      res.send(response.data);
    } else {
      res.status(404).json({ message: "Error" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
});

//Autocomplete
app.get("/api/autocomplete", async (req, res) => {
  var text = req.body.text;
  try {
    const response = await axios.get(
      `https://api.yelp.com/v3/autocomplete?text=${text}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.YELP_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response) {
      res.send(response.data);
    } else {
      res.status(404).json({ message: "Error" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
});

//Server
app.listen(5678); //start the server
console.log("Server is running...");
