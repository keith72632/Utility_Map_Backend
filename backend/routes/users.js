const express = require('express');
const bodyParser = require('body-parser');
const User = require('../models/user');

const router = express.Router();

const jsonParser = bodyParser.json();



router.post("/users/login", jsonParser, async(req, res, next) => {
  console.log("login api backend route hit");
  const { name, password } = req.body;

  const user = await User.findOne({name});

  if(user && (await user.matchPasswords(password))) {
    res.status(200).json({
      success: true,
      user: {
        name: user.name,
        password: user.password
      }
    })
  } else {
    res.status(400).send("Invalid username or password");
  }
});

module.exports = router;
