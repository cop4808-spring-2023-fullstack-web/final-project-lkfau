// Importing necessary modules
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

// Firebase admin configurations
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

/**
 * @description: Validates the user with the given authorization token
 * Access token is required in order to validate user
 * @async
 * @param {Object} req - A Express request object
 * @returns {Promise<boolean | firebase.auth.DecodedIdToken>} 
 *                     - Returns a promise that resolves to either 
 *                       - `false` if user validation fails
 *                       - decoded ID token if user validation succeeds
 */
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
/**
 * @description: Adds a new favorite restaurant to the user's list of favorites
 * Access token is required to proceed with the request
 * @callback
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns - Status code of 401 and an error message saying "invalid token" is 
 *            returned if user doesn't exist
 * @returns - Status code of 409 and an error message saying "alreadying in your
 *            favorites" if the restaurant is already in your favorites
 */
app.post("/api/favorite", async (req, res) => {
  try {

    const user = await validateUser(req)
    // If user validation fails, send a 401 Unauthorized response
    if (!user) {
      return res.status(401).send({ message: "Invalid token" });
    }

    // If user validation succeeds, proceed with the request
    const { business_id, restaurant_name } = req.body;

    // Check if the combination of user ID and business ID already exists in favorites collection
    const existingFavorite = await Favorite.findOne({ user_id: user.uid, business_id: business_id });

    if (existingFavorite) {
      return res.status(409).send({ message: "Already in your favorites" });
    }

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

/**
 * @name: deleteFavorite
 * @description: Deletes a restaurant from the user's list of favorites
 * Access token is required to proceed with the request
 * @async
 * @callback
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns - Status code of 401 and an error message saying "invalid token" is 
 *            returned if user doesn't exist
 * @returns - Status code of 409 and an error message saying "alreadying in your
 *            favorites" if the restaurant is already in your favorites
 */
app.delete("/api/favorite/:business_id", async (req, res) => {
  // user = await validateUser(req.headers.authorization);
  try {
    const user = await validateUser(req)

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

/**
 * @name: getFavorite
 * @description: Retrieves a user's favorite based on the provided business ID
 * @async
 * @callback
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} The response object with a message indicating success or failure.
 */
app.get("/api/favorite/:business_id", async (req, res) => {
  // user = await validateUser(req.headers.authorization);
  try {
    const user = await validateUser(req)

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

/**
 * @name: listFavorites
 * @description: Lists all the favorites of a user
 * @async
 * @callback
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} The response object with a message indicating success or failure.
 */
app.get("/api/favorites", async (req, res) => {
  try {
    const user = await validateUser(req)

    // If user validation fails, send a 401 Unauthorized response
    if (!user) {
      return res.status(401).send({ message: "Invalid token" });
    }

    // If user validation succeeds, proceed with the request
    const queryRestaurantName = req.query.restaurant_name;
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    const filter = {};
    filter.user_id = user.uid
    if (queryRestaurantName) {
      filter.restaurant_name = {
        $regex: `^${queryRestaurantName}`,
        $options: "i",
      };
    }
    try {
      const count = await Favorite.countDocuments(filter);
      const favorites = await Favorite.find(filter)
        .skip(skip)
        .limit(limit);
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
      const totalPages = Math.ceil(count / limit);
      res.send({ businesses: businesses.filter((business) => business !== null), totalPages });
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

/**
 * @name: searchRestaurants
 * @description: Searches restaurants by their location
 * @async
 * @callback
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} The response object with a message indicating success or failure.
 */
app.get("/api/search", async (req, res) => {
  try {
    const user = await validateUser(req)
    // If user validation fails, send a 401 Unauthorized response
    if (!user) {
      return res.status(401).send({ message: "Invalid token" });
    }

    // If user validation succeeds, proceed with the request
    let url = 'https://api.yelp.com/v3/businesses/search?categories=restaurants&';
  
    try {
      if (Object.hasOwn(req.query, "lat") && Object.hasOwn(req.query, "long")) {
        url += `latitude=${req.query.lat}&longitude=${req.query.long}&location=%27%27&`//For some reason yelp api call does not work if I just put empty string,
      } else {                                                                         //but will send an empty string if I set location = to %27%27
        url += `location=${req.query.location}&`;                                      //which is the URL-encoded representation of two single quotes
      }

      url += req.query.term.length ? `term=${req.query.term}&` : ""

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

/**
 * @name: searchRestaurants
 * @description: Searches restaurants by their location
 * Requires a valid token in order to proceeed with the request
 * @async
 * @callback
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @throws {Error} Throws an error if there is a problem with the request
 * @returns {Promise} Returns a Promise that resolves to an HTTP response
 * @returns{object} A 401 Unauthorized response is returned if user token is invalid
 */
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
      res.status(500).json({ message: "Error" });
    }
  } catch (err) {
    // If an error occurs, send a 500 Internal Server Error response
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

/**
 * @name: getReviews
 * @description: Gets reviews for a restaurant by its id
 * Requires a valid token in order to proceeed with the request
 * @async
 * @callback
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @throws {Object} 401 error if user token is invalid or missing
 * @throws {Object} 500 error for any other server-side error
 * @returns {Object} response object with Yelp API data
 */
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
      res.status(500).json({ message: "Error" });
    }
  } catch (err) {
    // If an error occurs, send a 500 Internal Server Error response
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

/**
 * @name: autocomplete
 * @description: Provides an autocomplete functionality 
 * Requires a valid token in order to proceeed with the request
 * @async
 * @callback
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @throws {Error} If there's an error with Yelp API call or user validation
 * @returns {Object} Returns the Yelp API autocomplete response data
 */
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
      res.status(500).json({ message: "Error" });
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
