const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
  user: String,
  name: String,
  coords : {
    lat: {type: String, required: true},
    lng: {type: String, required: true}
    },
    address: {type: String},
    icon: {type: String, require: true}
});

module.exports = mongoose.model('data', dataSchema);
