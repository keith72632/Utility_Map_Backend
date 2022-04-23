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
      console.log(`GET request at /data/:user for ${ req.params.user } from ${ req.ip }`)
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

  try {
    data.save();
    console.log(`POST request at /data for ${ req.body.user } from ${ req.ip }`)
  } catch {

  }

  res.status(201).json(data);
});


router.delete("/data/:address", jsonParser, async(req, res, next) => {

  Data.deleteOne({ address: req.params.address}).then( result => {
    res.status(204).json({message: "post deleted"});
    console.log(`DELETE request at /data/:address from ${ req.ip }`);
  })

})

module.exports = router;
