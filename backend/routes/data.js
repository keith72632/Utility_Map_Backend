const express = require('express');
const bodyParser = require('body-parser');
const Data = require('../models/data');
const fs = require('fs');

const router = express.Router();

const jsonParser = bodyParser.json();


router.get('/data/:user', (req, res, next) => {
  const { user } = req.params.user;
  Data.find({ user: req.params.user })
    .then(data => {
      res.status(200).json({
        message: "Locations fetched success",
        locations: data
      });
      next();
    })
    .catch();


});

router.post("/data", jsonParser, (req, res, next) => {
  const data = new Data({
    user: req.body.user,
    name: req.body.name,
    coords: {
      lat: req.body.coords.lat,
      lng: req.body.coords.lng
    },
    address: req.body.address,
    icon: req.body.icon
  });

  data.save();

  res.status(201).json(data);
});


router.delete("/data/:address", jsonParser, async(req, res, next) => {

  Data.deleteOne({ address: req.params.address}).then( result => {
    res.status(204).json({message: "post deleted"});
  })

})

module.exports = router;
