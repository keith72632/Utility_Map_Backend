const express = require('express');
const bodyParser = require('body-parser');
const Line = require('../models/line');
const { route } = require('./data');
const router = express.Router();

const jsonParser = bodyParser.json();

router.get('/line/:user', jsonParser, (req, res, next) => {
    Line.find({user: req.body.user})
        .then(data => {
            res.status(200).json({
                lineData: data
            });
            next();
        })
        .catch();
})


router.post('/line/:user', jsonParser, (req, res, next) => {
    const line = new Line({
        user: req.body.user,
        coords: {
            lat: req.body.coords.lat,
            lng: req.body.coords.lng
        }
    });

    line.save();

    res.status(201).json(line);
})


module.exports = router;