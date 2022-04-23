const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const userRoutes = require('./routes/users');
const dataRoutes = require('./routes/data');
const lineRoutes = require('./routes/line');

// Express no longer has body parsing capabilities
const bodyParser = require('body-parser');

// Mongoose Models
const User = require('./models/user');
const Location = require('./models/location');


const app = express();


const dbo = mongoose.connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Connection failed");
  });

// Require for body parsing
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With , Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS, PUT");
  next();
});

// Routers
app.use(userRoutes);
app.use(dataRoutes);
app.use(lineRoutes);




module.exports = app, dbo;
