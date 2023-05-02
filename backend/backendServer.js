// Importing necessary modules
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const http = require("http");
const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");
const admin = require("firebase-admin");

if (process.env.NODE_ENV !== "production") {
  app.use(express.static(path.join(__dirname, "../frontend/public"))); // local runtime environment
  require("dotenv").config();
} else {
  app.use(express.static(path.join(__dirname, "../frontend/build"))); // production build environment
  app.get("*", function (req, res, next) {
    if (req.originalUrl.startsWith("/api")) {
      return next();
    }
    res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html")); // redirect 404s
  });
}
const config = require("./config.js");

const adminConfig = {
  type: process.env.TYPE,
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
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

// app.use
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../final-project-lkfau")));
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// FavoriteInfo schema
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
 * @name validateUser
 * @description Validates the user with the given authorization token.
 * Access token is required in order to validate user.
 * @async
 * @param {Object} req - A Express request object
 * @returns {boolean | firebase.auth.DecodedIdToken} 
 * Either 'false' if user validation fails or the
 * decoded ID token if user validation succeeds
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
    const user = await admin.auth().verifyIdToken(token);
    console.log(user);
    return user;
  } catch (err) {
    return false;
  }
};

//Functions
/**
 * @name POST/Favorites
 * @description Adds a new favorite restaurant to the user's list of favorites.
 *              Access token is required to proceed with the request.
 * @async
 * @method
 * @param {string} accessToken Access token used to authenticate the user
 * @param {string} business_id ID that is being favorited
 * @param {string} restaurant_name Name of the restaurant
 * @throws {Error} Throws an error if there is a problem with the request
 * @returns {Object} Message indicating result of adding favorite to user's favorites
 */
app.post("/api/favorite", async (req, res) => {
  try {
    const user = await validateUser(req);
    // If user validation fails, send a 401 Unauthorized response
    if (!user) {
      return res.status(401).send({ message: "Invalid token" });
    }

    // If user validation succeeds, proceed with the request
    const { business_id, restaurant_name } = req.body;

    // Check if the combination of user ID and business ID already exists in favorites collection
    const existingFavorite = await Favorite.findOne({
      user_id: user.uid,
      business_id: business_id,
    });

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
 * @name DELETE/Favorite
 * @description Deletes a restaurant from the user's list of favorites.
 * @async
 * @method 
 * @param {string} accessToken Access token used to authenticate the user
 * @param {string} business_id ID that is being favorited
 * @throws {Error} Throws an error if there is a problem with the request
 * @returns {Object} Message indicating result of deleting favorite from user's favorites
 */
app.delete("/api/favorite/:business_id", async (req, res) => {
  // user = await validateUser(req.headers.authorization);
  try {
    const user = await validateUser(req);

    // If user validation fails, send a 401 Unauthorized response
    if (!user) {
      return res.status(401).send({ message: "Invalid token" });
    }

    // If user validation succeeds, proceed with the request
    var business_id = req.params.business_id;
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
      res.status(500).send({ message: "Error deleting favorite" });
    }
  } catch (err) {
    // If an error occurs, send a 500 Internal Server Error response
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

/**
 * @name GET/favorite
 * @description Retrieves a user's favorite based on the provided business ID.
 * @async
 * @method
 * @param {string} accessToken Access token used to authenticate the user
 * @param {string} business_id ID that is being favorited
 * @throws {Error} Throws an error if there is a problem with the request
 * @returns {Object} Message indicating result of deleting favorite from user's favorites
 */
app.get("/api/favorite/:business_id", async (req, res) => {
  // user = await validateUser(req.headers.authorization);
  try {
    const user = await validateUser(req);

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
 * @name GET/favorites
 * @description Lists all the favorites of a user.
 * @async
 * @method
 * @param {string} queryRestaurantName Name of the restaurant to filter by
 * @param {number} page Page number for pagination
 * @param {string} accessToken Access token used to authenticate the user
 * @throws {Error} Throws an error if there is a problem with the request
 * @returns {Object} List of all the favorites a user has
 */
app.get("/api/favorites", async (req, res) => {
  try {
    const user = await validateUser(req);

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
    filter.user_id = user.uid;
    if (queryRestaurantName) {
      filter.restaurant_name = {
        $regex: `^${queryRestaurantName}`,
        $options: "i",
      };
    }
    try {
      const count = await Favorite.countDocuments(filter);
      const favorites = await Favorite.find(filter).skip(skip).limit(limit);
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
      res.send({
        businesses: businesses.filter((business) => business !== null),
        totalPages,
      });
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
 * @name GET/Search
 * @description Searches restaurants with their location by using longitude and latitude.
 * @async
 * @method
 * @param {number} lat Latitude coordinate of user's location
 * @param {number} long Longitude coordinate of user's location
 * @param {string} term Search term that is entered by user
 * @param {string} loc Location of user
 * @param {string} accessToken Access token used to authenticate the user
 * @throws {Error} Throws an error if there is a problem with the request
 * @returns {Object} Restaurants that are close to the users location
 */
app.get("/api/search", async (req, res) => {
  try {
    const user = await validateUser(req);
    // If user validation fails, send a 401 Unauthorized response
    if (!user) {
      return res.status(401).send({ message: "Invalid token" });
    }

    // If user validation succeeds, proceed with the request
    let url =
      "https://api.yelp.com/v3/businesses/search?categories=restaurants&";

    try {
      if (Object.hasOwn(req.query, "lat") && Object.hasOwn(req.query, "long")) {
        url += `latitude=${req.query.lat}&longitude=${req.query.long}&location=%27%27&`; //For some reason yelp api call does not work if I just put empty string,
      } else {
        //but will send an empty string if I set location = to %27%27
        url += `location=${req.query.loc}&`; //which is the URL-encoded representation of two single quotes
      }

      url += req.query.term.length ? `term=${req.query.term}&` : "";

      // Add filters here

      url += `limit=10&offset=${req.query.page ? Math.floor(req.query.page * 10) : "0"}`;
      url = url.replace(" ", "%20");
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${process.env.YELP_API_KEY}`,
          "Content-Type": "application/json",
        },
      });
      if (response) {
        res.send(response.data);
      } else {
        res.status(404).json({ message: "Error" });
      }
    } catch (err) {
      res.status(500).json({ message: "Error" });
    }
  } catch (err) {
    // If an error occurs, send a 500 Internal Server Error response
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

/**
 * @name GET/view
 * @description Views restaurants information by the business_id.
 * @async
 * @method
 * @param {string} business_id ID that is being favorited
 * @param {string} accessToken Access token used to authenticate the user
 * @throws {Error} Throws an error if there is a problem with the request
 * @returns {Object} Restaurant info about the specific restaurant the user wants
 */
app.get("/api/view/:business_id", async (req, res) => {
  try {
    const user = await validateUser(req);

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
 * @name GET/review
 * @description Gets reviews for a restaurant by the business_id.
 * @async
 * @method
 * @param {string} business_id ID that is being favorited
 * @param {string} accessToken Access token used to authenticate the user
 * @throws {401} If the user is not authorized to access the resource
 * @throws {404} If the resource being accessed is not found
 * @throws {500} If there is an internal server error
 * @returns {Object} All the reviews of the restaurant being viewed
 */
app.get("/api/review/:business_id", async (req, res) => {
  try {
    const user = await validateUser(req);

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
 * @name GET/autocomplete
 * @description Gets autocomplete suggestions for restaurants
 * @async
 * @method
 * @param {string} accessToken Access token used to authenticate the user
 * @param {string} text User input to search for restaurants
 * @throws {Error} If there's an error with Yelp API call or user validation
 * @returns {Object} A list of restaurants
 */
app.get("/api/autocomplete/:text", async (req, res) => {
  try {
    const user = await validateUser(req);

    // If user validation fails, send a 401 Unauthorized response
    if (!user) {
      return res.status(401).send({ message: "Invalid token" });
    }

    // If user validation succeeds, proceed with the request
    var text = req.params.text;
    try {
      const response = await axios.get(
        `https://api.yelp.com/v3/autocomplete?text=${text}&categories=restaurants`,
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
app.listen(process.env.PORT || 5678); //start the server
console.log("Server is running...");