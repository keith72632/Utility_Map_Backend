const express = require('express');
const bodyParser = require('body-parser');
const Location = require('../models/location');

const router = express.Router();

const jsonParser = bodyParser.json();


router.get('/locations', (req, res, next) => {
  Location.find()
    .then(data => {
      res.status(200).json({
        message: "Locations fetched success",
        locations: data
      });
      next();
    })
    .catch();


});

router.post("/locations", jsonParser, (req, res, next) => {
  const location = new Location({
    coords: {
      lat: req.body.coords.lat,
      lng: req.body.coords.lng
    },
    address: req.body.address,
    icon: req.body.icon
  });

  location.save();

  res.status(201).json(location);
});

module.exports = router;
