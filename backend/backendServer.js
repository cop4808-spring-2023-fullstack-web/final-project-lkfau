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

//FavoriteInfo schema
const favoriteInfoSchema = new mongoose.Schema(
  {
    user_id: String,
    business_id: String,
    restaurant_name: String,
  },
  { versionKey: false }
);

//Set favorite model
const Favorite = mongoose.model("favorite", favoriteInfoSchema);

const validateUser = async (req) => {
  // Get the authorization header from the request
  const token = req.headers.authorization;
  // Check if the authorization header is present
  if (!token) {
    return false;
  }
   
  // Validate the user using the token
  try {
    return await admin.auth().verifyIdToken(token);
  } catch (err) {
    return false;
  }
};

//Functions
//Add Favorite
app.post("/api/favorite", async (req, res) => {
  try {

    const user = await validateUser(req)
    // If user validation fails, send a 401 Unauthorized response
    if (!user) {
      return res.status(401).send({ message: "Invalid token" });
    }

    // If user validation succeeds, proceed with the request
    const { business_id, restaurant_name } = req.body;

    const favorite = new Favorite({
      user_id: user.uid,
      business_id: business_id,
      restaurant_name: restaurant_name,
    });

    favorite.save();
    res.send({ message: `Added ${favorite} to favorites` });
  } catch (err) {
    // If an error occurs, send a 500 Internal Server Error response
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//Delete Favorite
app.delete("/api/favorite/:business_id", async (req, res) => {
  // user = await validateUser(req.headers.authorization);
  try {
    const user = validateUser(req)

    // If user validation fails, send a 401 Unauthorized response
    if (!user) {
      return res.status(401).send({ message: "Invalid token" });
    }

    // If user validation succeeds, proceed with the request
    var business_id = req.params.business_id;
    console.log(business_id);
    try {
      const favorite = await Favorite.findOneAndDelete({
        user_id: user.uid,
        business_id: business_id,
      });
      if (favorite) {
        res.send({ message: `Deleted ${favorite} from favorites` });
      } else {
        res.status(404).json({ message: "Favorite not found" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Error deleting favorite"});
    }
  } catch (err) {
    // If an error occurs, send a 500 Internal Server Error response
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//View Favorite
app.get("/api/favorite/:business_id", async (req, res) => {
  // user = await validateUser(req.headers.authorization);
  try {
    const user = validateUser(req)

    // If user validation fails, send a 401 Unauthorized response
    if (!user) {
      return res.status(401).send({ message: "Invalid token" });
    }

    // If user validation succeeds, proceed with the request
    var business_id = req.params.business_id;
    try {
      const favorite = await Favorite.findOne({
        user_id: user.uid,
        business_id: business_id,
      });
      if (favorite) {
        res.send({ message: `Viewing ${favorite} from favorites` });
      } else {
        res.status(404).json({ message: "Favorite not found" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Error viewing favorite");
    }
  } catch (err) {
    // If an error occurs, send a 500 Internal Server Error response
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.get("/api/favorites", async (req, res) => {
  try {
    const user = validateUser(req)

    // If user validation fails, send a 401 Unauthorized response
    if (!user) {
      return res.status(401).send({ message: "Invalid token" });
    }

    // If user validation succeeds, proceed with the request
    const queryRestaurantName = req.query.restaurant_name;
    const filter = {};
    filter.user_id = user.uid
    if (queryRestaurantName) {
      filter.restaurant_name = {
        $regex: `^${queryRestaurantName}`,
        $options: "i",
      };
    }
    try {
      const favorites = await Favorite.find(filter);
      const businessIds = favorites.map((favorite) => favorite.business_id);
      const businesses = await Promise.all(
        businessIds.map(async (business_id) => {
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
            return response.data;
          } catch (err) {
            console.log(err);
            return null;
          }
        })
      );
      res.send(businesses.filter((business) => business !== null));
    } catch (err) {
      console.log(err);
      res.status(500).send("Error viewing favorites");
    }
  } catch (err) {
    // If an error occurs, send a 500 Internal Server Error response
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//Search businesses by location
app.get("/api/search", async (req, res) => {
  try {
    const user = await validateUser(req)
    // If user validation fails, send a 401 Unauthorized response
    if (!user) {
      return res.status(401).send({ message: "Invalid token" });
    }

    // If user validation succeeds, proceed with the request
    let url = 'https://api.yelp.com/v3/businesses/search?';
  
    try {
      if (Object.hasOwn(req.query, "lat") && Object.hasOwn(req.query, "long")) {
        url += `latitude=${req.query.lat}&longitude=${req.query.long}&location=%27%27&`//For some reason yelp api call does not work if I just put empty string,
      } else {                                                                         //but will send an empty string if I set location = to %27%27
        url += `location=${req.query.location}&`;                                      //which is the URL-encoded representation of two single quotes
      }

      url += req.query.term.length ? `term=${req.query.term}&` : "term=restaurant&"

      // Add filters here

      url += `limit=10&offset=${Math.floor(req.query.page * 10)}`
      const response = await axios.get(url,{
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
      //console.log(err);
      res.status(500).json({ message: "Error" });
    }
  } catch (err) {
    // If an error occurs, send a 500 Internal Server Error response
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Get info on business by business id
app.get("/api/view/:business_id", async (req, res) => {
  try {
    const user = await validateUser(req)

    // If user validation fails, send a 401 Unauthorized response
    if (!user) {
      return res.status(401).send({ message: "Invalid token" });
    }

    // If user validation succeeds, proceed with the request
    var business_id = req.params.business_id;
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
  } catch (err) {
    // If an error occurs, send a 500 Internal Server Error response
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//Get reviews for a business by business id
app.get("/api/review/:business_id", async (req, res) => {
  try {
    const user = await validateUser(req)

    // If user validation fails, send a 401 Unauthorized response
    if (!user) {
      return res.status(401).send({ message: "Invalid token" });
    }

    // If user validation succeeds, proceed with the request
    var business_id = req.params.business_id;
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
  } catch (err) {
    // If an error occurs, send a 500 Internal Server Error response
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//Autocomplete
app.get("/api/autocomplete", async (req, res) => {
  try {
    const user = await validateUser(req)

    // If user validation fails, send a 401 Unauthorized response
    if (!user) {
      return res.status(401).send({ message: "Invalid token" });
    }

    // If user validation succeeds, proceed with the request
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
  } catch (err) {
    // If an error occurs, send a 500 Internal Server Error response
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//Server
app.listen(5678); //start the server
console.log("Server is running...");
