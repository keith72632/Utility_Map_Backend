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
    });

    console.log(`${ user.name } logged in at ${ req.ip }`);
  } else {
    res.status(400).send("Invalid username or password");
  }
});


router.post("/api/users", jsonParser, (req, res, next) => {
  const user = new User({
    name: req.body.name,
    password: req.body.password
  });

  try {
    user.save();
    console.log(`User ${ req.body.name } created from ${ req.ip }`);
  } catch {
    console.log(`Failed user creation from ${ req.ip }`);
  }

  console.log(user.name);
  res.status(201).json(user);
});

module.exports = router;
