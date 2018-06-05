const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
  venueName: { type: String, required: true},
  lessons: {type: String},
  addressLine1: {type: String, required: true},
  addressLine2: {type: String, required: true},
  postcode: {type: String, required: true},
  description: {type: String, required: true},
  image: String,
  website: {type: String, required: true},
  comments: [{
    subject: {type: String},
    comment: {type: String},
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
  }]
});


module.exports = mongoose.model('Venue', venueSchema);
