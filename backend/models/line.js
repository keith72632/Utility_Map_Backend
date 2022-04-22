const mongoose = require('mongoose');

const lineSchema = mongoose.Schema({
    user: String, 
    coords : {
        lat: {type: String, required: true},
        lng: {type: String, required: true}
        }
});

module.exports = mongoose.model('line', lineSchema);
