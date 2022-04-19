const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({
  coords : {
    lat: {type: String, required: true},
    lng: {type: String, required: true}
  },
  address: {type: String},
  icon: {type: String, require: true}
});

module.exports = mongoose.model('Location', locationSchema);
