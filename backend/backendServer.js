//Imports
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose');
const cors = require('cors');
// import .env
// important config.js (Database info)

//app.use
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../final-project-lkfau')));
app.use(cors());

//Catch for 404 error
// app.use((req, res, next) => {
//   res.status(404).sendFile(path.join(__dirname, '//404.html//'));
// });

//Functions

//Server
app.listen(5678); //start the server
console.log('Server is running...');